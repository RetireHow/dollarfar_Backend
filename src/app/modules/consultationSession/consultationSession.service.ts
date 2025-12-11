/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IConsultationSession } from './consultationSession.interface';
import { ConsultationSession } from './consultationSession.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ConsultationSubscription } from '../consultationSubscription/consultationSubscription.model';
import { TConsultationSubscription } from '../consultationSubscription/consultationSubscription.interface';
import { ConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.model';

const bookConsultationSessionIntoDB = async (payload: IConsultationSession) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find active subscription
    const subscription = (await ConsultationSubscription.findOne({
      _id: payload.subscription,
      email: payload.contact.email,
      status: 'active',
    })) as TConsultationSubscription;

    if (!subscription) {
      throw new AppError(httpStatus.NOT_FOUND, 'No active subscription found');
    }

    // Check expiry
    if (new Date() > subscription.expiryDate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Subscription has expired');
    }

    // Check available sessions
    if (subscription.sessionsUsed! >= subscription.sessionsPurchased!) {
      throw new AppError(httpStatus.BAD_REQUEST, 'All sessions have been used');
    }

    // 2) Prevent slot collision
    const slotUTC = new Date(payload.slot);

    const exists = await ConsultationSession.findOne({
      slot: slotUTC,
      isDeleted: false,
    }).session(session);

    if (exists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'This time slot is already booked',
      );
    }

    //Get info from consultation schedule config
    const scheduleConfig = await ConsultationScheduleConfig.findOne();
    if (!scheduleConfig) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No consultation schedule configuration found!',
      );
    }

    const session_number = subscription.sessionsUsed! + 1;
    const sessions_remaining = subscription.sessionsPurchased! - session_number;
    const newSessionData = {
      ...payload,
      providerTZ: scheduleConfig?.providerTimezone,
      session_duration: scheduleConfig?.slotDurationMinutes,
      slot: slotUTC,
      session_number,
      sessions_remaining,
    };

    // create a consultation session (transaction-1)
    const consultationSessoin = await ConsultationSession.create(
      [newSessionData],
      {
        session,
      },
    ); // array

    //check if consultation session is created
    if (!consultationSessoin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create consultation session',
      );
    }

    // update subscription (transaction-2)
    const updatedSubscription = await ConsultationSubscription.findOneAndUpdate(
      { _id: subscription._id },
      [
        {
          $set: {
            sessionsUsed: { $add: ['$sessionsUsed', 1] },
            status: {
              $cond: {
                if: {
                  $gte: [{ $add: ['$sessionsUsed', 1] }, '$sessionsPurchased'],
                },
                then: 'used',
                else: '$status',
              },
            },
          },
        },
      ],
      { new: true, session },
    );

    //check if subscription is updated
    if (!updatedSubscription) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update subscription',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return consultationSessoin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getUserConsultationSessionsFromDB = async (email: string) => {
  const res = await ConsultationSession.find({ email }).populate(
    'subscription',
  );
  return res;
};

const getAllConsultationSessionsFromDB = async () => {
  const res = await ConsultationSession.find({}).populate('subscription');
  return res;
};

const getSingleConsultationSessionFromDB = async (sessionId: string) => {
  const res =
    await ConsultationSession.findById(sessionId).populate('subscription');
  return res;
};

export const ConsultationSessionServices = {
  bookConsultationSessionIntoDB,
  getUserConsultationSessionsFromDB,
  getAllConsultationSessionsFromDB,
  getSingleConsultationSessionFromDB,
};

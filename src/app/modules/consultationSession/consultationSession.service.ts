/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IConsultationSession } from './consultationSession.interface';
import { ConsultationSession } from './consultationSession.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ConsultationSubscription } from '../consultationSubscription/consultationSubscription.model';
import { TConsultationSubscription } from '../consultationSubscription/consultationSubscription.interface';
import { DateTime } from 'luxon';

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

    const session_number = subscription.sessionsUsed! + 1;
    const sessions_remaining = subscription.sessionsPurchased! - session_number;
    const newSessionData = {
      ...payload,
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

// Example provider time zone
const PROVIDER_TZ = 'America/Toronto';
const SLOT_MINUTES = 30;
const START_HOUR = 10;
const END_HOUR = 16;

// Helper: generate slots (as JS Date objects in UTC)
function generateSlotsForDateIso(dateIso: string) {
  // dateIso expected like '2025-12-01' (local date in provider tz)
  const slots = [];

  // Start at provider's date at START_HOUR (in provider tz)
  let current = DateTime.fromISO(dateIso, { zone: PROVIDER_TZ }).set({
    hour: START_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const end = DateTime.fromISO(dateIso, { zone: PROVIDER_TZ }).set({
    hour: END_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  while (current < end) {
    // convert to UTC Date object for DB/comparison
    slots.push(current.toUTC().toJSDate());
    current = current.plus({ minutes: SLOT_MINUTES });
  }

  return slots;
}

const getAllConsultationSessionSlotsFromDB = async (date: string) => {
  // generate candidate slots in UTC Date form
  const candidates = generateSlotsForDateIso(date);

  // fetch bookings that fall on that date's candidate slots (slot field stored as UTC Date)
  const startWindow = candidates[0];
  const endWindow = candidates[candidates.length - 1];

  // fetch bookings in that window (plus slot duration to be safe)
  const booked = await ConsultationSession.find({
    slot: {
      $gte: startWindow,
      $lte: new Date(endWindow.getTime() + 30 * 60 * 1000),
    },
  }).select('slot -_id');

  const bookedSet = new Set(booked.map(b => b.slot.toISOString()));

  // prepare response: array of objects { utc: ISOString, providerISO: ISOString (provider tz), available: bool }
  const response = candidates.map(d => {
    const isoUtc = d.toISOString();
    const providerZoned = DateTime.fromJSDate(d, { zone: 'UTC' })
      .setZone(PROVIDER_TZ)
      .toISO();
    return {
      utc: isoUtc,
      providerTime: providerZoned,
      available: !bookedSet.has(isoUtc),
    };
  });
  return response;
};

export const ConsultationSessionServices = {
  bookConsultationSessionIntoDB,
  getUserConsultationSessionsFromDB,
  getAllConsultationSessionsFromDB,
  getSingleConsultationSessionFromDB,
  getAllConsultationSessionSlotsFromDB,
};

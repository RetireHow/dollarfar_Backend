/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IConsultationSession } from './consultationSession.interface';
import { ConsultationSession } from './consultationSession.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { ConsultationSubscription } from '../consultationSubscription/consultationSubscription.model';
import { TConsultationSubscription } from '../consultationSubscription/consultationSubscription.interface';
import { ConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.model';
import { sendUserEmail } from '../../utils/sendUserEmail';
import { IConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.interface';

type TConsultantPersonalInfo = {
  name: string;
  email: string;
  country: string;
  state: string;
  consultantTZ: string;
  consultantTZ_IANA: string;
};

function convertUTCToTimeZone(utcString: Date, targetTZ_IANA: string) {
  // Parse input as *UTC* explicitly
  const date = new Date(utcString);

  // Use target timezone for formatting
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone: targetTZ_IANA,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Break into parts
  const parts = dtf.formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value;

  return `${get('day')} ${get('month')} ${get('year')} ${get('hour')}:${get(
    'minute',
  )} ${get('dayPeriod')!.toUpperCase()}`;
}

const getCustomerEmailHTMLBody = (
  data: IConsultationSession,
  consultantPersonalInfo: TConsultantPersonalInfo,
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RetireHow Consultation Confirmation</title>
    <style>
        body {
            line-height: 30px;
            margin: 20px;
            font-family: Arial, sans-serif;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <header style="margin-bottom:20px;">
        <p style="font-size:18px;">
            Hi <strong>${data?.contact.name}</strong>,
        </p>
        <p>
            Thank you for booking your consultation session with RetireHow! We're
            excited to help you.
        </p>
    </header>

    <div style="margin-bottom:20px;">
        <p style="font-size:18px;">
            <strong>Session Details:</strong>
        </p>
        <p>
            <strong>- Scheduled Time:</strong> ${convertUTCToTimeZone(data?.slot, data.userTZ_IANA)} - ${data.userTZ}
        </p>
        <p>
            <strong>- Duration:</strong> 30 minutes
        </p>
        <p>
            <strong>- Format:</strong> Online video call (Zoom/Google Meet/Microsoft Teams link
            will be sent 24 hours before the session)
        </p>
    </div>

     <div style="margin-bottom:20px;">
        <p style="font-size:18px;">
            <strong>Consultant Details:</strong>
        </p>
        <p>
            <strong>- Name:</strong> ${consultantPersonalInfo.name}
        </p>
        <p>
            <strong>- Email:</strong> ${consultantPersonalInfo.email}
        </p>
        <p>
            <strong>- Country:</strong> ${consultantPersonalInfo.country}
        </p>
        <p>
            <strong>- Province/State:</strong> ${consultantPersonalInfo.state}
        </p>
         <p>
            <strong>- Scheduled Time:</strong> ${convertUTCToTimeZone(data.slot, consultantPersonalInfo.consultantTZ_IANA)} - ${consultantPersonalInfo.consultantTZ}
        </p>
    </div>

    <div style="margin-bottom:20px;">
        <p style="font-size:18px;">
            <strong>How to Join:</strong>
        </p>
        <p>
            We'll send you the meeting link and any preparation materials 24 hours
            before your scheduled session.
        </p>
    </div>

    <footer>
        <p style="margin-bottom:15px;">
            We're looking forward to helping you make informed decisions about
            your retirement planning!
        </p>

        <p style="margin-bottom:8px;">Warm regards,</p>

        <p>Rao Movva, PFP, CIM, CIWM, FCSI</p>
        <p>Founder, CEO</p>
        <p>RetireHow.com & TravelGlobal.ca</p>
        <p>Phone Canada Office: 1-289-815-3631</p>
        <p>Email: rao.movva@retirehow.com</p>
        <p>P.S. Don’t forget to check your inbox for more insights and resources coming your way!</p>
    </footer>
</body>
</html>`;
};

const getAdvisorEmailHTMLBody = (
  data: IConsultationSession,
  consultantPersonalInfo: TConsultantPersonalInfo,
) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 30px;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            margin-bottom: 20px;
        }
        p {
            margin: 0 0 10px 0;
        }
        strong {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <header>
        <p style="font-size: 18px;">
            Hi <strong>${consultantPersonalInfo.name}</strong>,
        </p>
        <p style="font-size: 17px;"><strong>New consultation booking from dollarfar.com</strong></p>
    </header>

    <div style="margin-bottom: 20px;">
        <p style="font-size: 18px;">
            <strong>Session Details:</strong>
        </p>
        <p>
            <strong>- Client Name:</strong> ${data.contact.name}
        </p>
        <p>
            <strong>- Email:</strong> ${data.contact.email}
        </p>
        <p>
            <strong>- Phone:</strong> ${data.contact.phone}
        </p>
        <p>
            <strong>- State/Province:</strong> ${data.contact.region}
        </p>
         <p>
            <strong>- Country:</strong> ${data.contact.country}
        </p>
        <p>
            <strong>- Scheduled Time:</strong>
        </p>
        <p>
            ${convertUTCToTimeZone(data.slot, consultantPersonalInfo.consultantTZ_IANA)} - ${consultantPersonalInfo.consultantTZ}
        </p>
        <p>
            ${convertUTCToTimeZone(data.slot, data.userTZ_IANA)} - ${data.userTZ}
        </p>
        <p>
            <strong>- Duration:</strong> 30 minutes
        </p>
        <p>
            <strong>- Format:</strong> Online video call
        </p>
    </div>
</body>
</html>`;
};

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
    const scheduleConfig =
      (await ConsultationScheduleConfig.findOne()) as IConsultationScheduleConfig;
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
      consultantTZ: scheduleConfig?.consultantTZ,
      consultantTZ_IANA: scheduleConfig?.consultantTZ_IANA,
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

    // Send email to customer
    const consultantPersonalInfo = {
      name: scheduleConfig.name,
      email: scheduleConfig.email,
      country: scheduleConfig.country,
      state: scheduleConfig.state,
      consultantTZ: scheduleConfig.consultantTZ,
      consultantTZ_IANA: scheduleConfig.consultantTZ_IANA,
    };
    const customreZeptoRes = await sendUserEmail({
      to: [{ address: payload.contact.email, name: payload.contact.name }],
      subject: 'Your Consultation Session is Confirmed!',
      body: getCustomerEmailHTMLBody(payload, consultantPersonalInfo),
    });
    if (customreZeptoRes.error) {
      throw customreZeptoRes.error;
    }

    // Send email to consultant
    const consultantZeptoRes = await sendUserEmail({
      to: [
        {
          address: consultantPersonalInfo.email,
          name: consultantPersonalInfo.name,
        },
      ],
      subject: 'You have received a new consultation booking via Dollarfar',
      body: getAdvisorEmailHTMLBody(payload, consultantPersonalInfo),
    });
    if (consultantZeptoRes.error) {
      throw consultantZeptoRes.error;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import config from '../../config';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ConsultationSubscription } from './consultationSubscription.model';
import { scheduleConsultationSubscriptionExpiry } from '../../agenda/schedule/scheduleConsultationSubscription';
import { sendTemplatedEmail } from '../../utils/sendTemplatedEmail';
import { ConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.model';
import { IConsultationScheduleConfig } from '../consultationScheduleConfig/consultationScheduleConfig.interface';

const stripe = new Stripe(config.stripe_secret_key_test as string);

const createConsultationSubscriptionPaymentIntentFromDB = async (payload: {
  name: string;
  email: string;
  phone: string;
}) => {
  const { name, email, phone } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 19900, // $199.00 CAD in cents
    currency: 'cad',
    automatic_payment_methods: { enabled: true },
    metadata: {
      name,
      email,
      phone,
      product: 'retirehow_subscription',
    },
  });
  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

const handleConsultationSubscriptionSuccessWebhookIntoDB = async (req: any) => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe_webhook_secret_key_test as string,
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;

    // Retrieve customer info from metadata
    const { name, email, phone } = pi.metadata;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 12);

    const newSubscriptionData = {
      name,
      email,
      phone,
      paymentIntentId: pi?.id,
      expiryDate,
    };

    try {
      // Store into DB
      const consultationSubscription =
        await ConsultationSubscription.create(newSubscriptionData);

      // Schedule expiration
      await scheduleConsultationSubscriptionExpiry(consultationSubscription);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }

    // // Send confirmation email to user
    const userZeptoRes = await sendTemplatedEmail({
      templateKey:
        '3b2f8.24630c2170da85ea.k1.f569bc30-c5e7-11f0-bf33-ee3032389deb.19aa04ddf73', //User Notification
      to: [{ address: email, name: name }],
      mergeInfo: {
        name: name,
      },
    });
    if (userZeptoRes.error) {
      throw userZeptoRes.error;
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

    // Send confirmation email to financial advisor
    const advisorZeptoRes = await sendTemplatedEmail({
      templateKey:
        '3b2f8.24630c2170da85ea.k1.af6e6ea0-c5e8-11f0-bf33-ee3032389deb.19aa052a28a', //Financial Advisor Notification
      to: [{ address: scheduleConfig.email, name: scheduleConfig.name }],
      mergeInfo: {
        name: name,
        email: email,
        phone: phone,
      },
    });
    if (advisorZeptoRes.error) {
      throw advisorZeptoRes.error;
    }
  }

  return { received: true };
};

const createConsultationSubscriptionIntentFromDB = async (payload: {
  name: string;
  email: string;
  phone: string;
}) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 19900, // $199.00 CAD in cents
    currency: 'cad',
    automatic_payment_methods: { enabled: true },
    metadata: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      product: 'retirehow_subscription',
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

const getSingleActiveConsultationSubscriptionFromDB = async (email: string) => {
  const now = new Date();
  const subscription = await ConsultationSubscription.findOne({
    email,
    status: 'active',
    expiryDate: { $gte: now }, // not expired
    $expr: {
      // sessionsUsed < sessionsPurchased
      $lt: ['$sessionsUsed', '$sessionsPurchased'],
    },
  });
  return subscription;
};

const getAllActiveConsultationSubscriptionsFromDB = async () => {
  const now = new Date();
  const subscription = await ConsultationSubscription.find({
    status: 'active',
    expiryDate: { $gte: now }, // not expired
    $expr: {
      // sessionsUsed < sessionsPurchased
      $lt: ['$sessionsUsed', '$sessionsPurchased'],
    },
  });
  return subscription;
};

const getAllUsedConsultationSubscriptionsFromDB = async () => {
  const subscription = await ConsultationSubscription.find({
    status: 'used',
    $expr: {
      // sessionsUsed < sessionsPurchased
      $eq: ['$sessionsUsed', '$sessionsPurchased'],
    },
  });
  return subscription;
};

const getAllExpiredConsultationSubscriptionsFromDB = async () => {
  const now = new Date();
  const subscription = await ConsultationSubscription.find({
    expiryDate: { $lte: now }, // expired
  });
  return subscription;
};

export const ConsultationSubscriptionServices = {
  createConsultationSubscriptionPaymentIntentFromDB,
  handleConsultationSubscriptionSuccessWebhookIntoDB,

  createConsultationSubscriptionIntentFromDB,
  getSingleActiveConsultationSubscriptionFromDB,

  getAllActiveConsultationSubscriptionsFromDB,
  getAllUsedConsultationSubscriptionsFromDB,
  getAllExpiredConsultationSubscriptionsFromDB,
};

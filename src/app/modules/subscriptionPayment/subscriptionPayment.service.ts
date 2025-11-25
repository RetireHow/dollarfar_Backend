import Stripe from 'stripe';
import config from '../../config';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SubscriptionPayment } from './subscriptionPayment.model';

const stripe = new Stripe(config.stripe_secret_key_test as string);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSubscriptionPaymentIntoDB = async (req: any) => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe_webhook_secret_key_test as string,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;

    // Retrieve customer info from metadata
    const name = pi.metadata.name;
    const email = pi.metadata.email;
    const phone = pi.metadata.phone;
    const paymentIntentId = pi.id;
    const status = pi.status;

    const newSubscriptionData = {
      paymentIntentId,
      customer: { name, email, phone },
      amount: 199,
      currency: 'CAD',
      status,
    };

    try {
      // Store into DB
      await SubscriptionPayment.create(newSubscriptionData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }

    // Send confirmation email to user
    const userZeptoRes = await sendZeptoEmail({
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

    // Send confirmation email to financial advisor
    const advisorZeptoRes = await sendZeptoEmail({
      templateKey:
        '3b2f8.24630c2170da85ea.k1.af6e6ea0-c5e8-11f0-bf33-ee3032389deb.19aa052a28a', //Financial Advisor Notification
      // to: [{ address: 'rao.movva@retirehow.com', name: 'Rao Movva' }],
      to: [
        { address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' },
      ],
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

const createSubscriptionPaymentIntentFromDB = async (payload: {
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

const getSingleSubscriptionPaymentFromDB = async (paymentIntentId: string) => {
  const res = await SubscriptionPayment.findOne({ paymentIntentId });
  return res;
};

export const SubscriptionPaymentServices = {
  createSubscriptionPaymentIntoDB,
  createSubscriptionPaymentIntentFromDB,
  getSingleSubscriptionPaymentFromDB,
};

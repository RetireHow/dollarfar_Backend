import { RetirementNextStepModel } from './retirementNextStepPlan.model';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';
import Stripe from 'stripe';
import config from '../../config';
const stripe_sk =
  config.node_env === 'development'
    ? config.stripe_secret_key_test
    : config.stripe_secret_key;

const stripe = new Stripe(stripe_sk as string);

const createRetirementNextStepPlanIntoDB = async (
  payload: TRetirementNextStep,
) => {
  const zeptoRes = await sendZeptoEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ea908f10-bad8-11f0-9a59-1ad0b05a72f3.19a57d45a81',
    // to: [{ address: 'rao.movva@retirehow.com', name: 'Rao Movva' }],
    to: [{ address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' }],
    mergeInfo: {
      name: payload.contact.name,
      email: payload.contact.email,
      phone: payload.contact.phone,
      region: payload.contact.region,
    },
  });

  if (zeptoRes.error) {
    throw zeptoRes.error;
  }
  const res = RetirementNextStepModel.create(payload);
  return res;
};

const getAllRetirementNextStepPlansFromDB = async () => {
  const res = RetirementNextStepModel.find({}).sort({ _id: -1 });
  return res;
};

const createRetirementSubscriptionPaymentIntoDB = async (payload: {
  name: string;
  email: string;
  phone: string;
}) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 19900, // $199.00 CAD in cents
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      product: 'retirehow_subscription',
      description: '2 × 30-minute consultation sessions',
    },
  });

  // Send confirmation email to user
  const userZeptoRes = await sendZeptoEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.f569bc30-c5e7-11f0-bf33-ee3032389deb.19aa04ddf73', //User Notification
    to: [{ address: payload.email, name: payload.name }],
    mergeInfo: {
      name: payload.name,
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
    to: [{ address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' }],
    mergeInfo: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  });
  if (advisorZeptoRes.error) {
    throw advisorZeptoRes.error;
  }

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

export const RetirementNextStepServices = {
  createRetirementNextStepPlanIntoDB,
  getAllRetirementNextStepPlansFromDB,
  createRetirementSubscriptionPaymentIntoDB,
};

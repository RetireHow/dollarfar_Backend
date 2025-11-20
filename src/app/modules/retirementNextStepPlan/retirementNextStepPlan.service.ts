import { RetirementNextStepModel } from './retirementNextStepPlan.model';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';
import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.stripe_secret_key as string);

const createRetirementNextStepPlanIntoDB = async (
  payload: TRetirementNextStep,
) => {
  const zeptoRes = await sendZeptoEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ea908f10-bad8-11f0-9a59-1ad0b05a72f3.19a57d45a81',
    // to: [{ address: 'rao.movva@retirehow.com', name: 'Rao Movva' }],
    to: [{ address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' }],
    mergeInfo: {
      name: payload.contact.full_name,
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

const createRetirementSubscriptionPaymentIntoDB = async () => {
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

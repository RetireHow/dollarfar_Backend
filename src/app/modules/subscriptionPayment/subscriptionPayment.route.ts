import express from 'express';
import { SubscriptionPaymentControllers } from './subscriptionPayment.controller';

const router = express.Router();

router.post(
  '/create-subscription-payment',
  SubscriptionPaymentControllers.createSubscriptionPayment,
);

router.post(
  '/create-subscription-payment-intent',
  SubscriptionPaymentControllers.createSubscriptionPaymentIntent,
);

router.get(
  '/get-subscription-payment/:paymentIntentId',
  SubscriptionPaymentControllers.getSingleSubscriptionPayment,
);

export const SubscriptionPaymentRoutes = router;

import express from 'express';
import { ConsultationSubscriptionControllers } from './consultationSubscription.controller';
import { ConsultationSubscriptionValidation } from './consultationSubscription.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  ConsultationSubscriptionControllers.handleConsultationSubscriptionSuccessWebhook,
);

router.post(
  '/payment-intent',
  validateRequest(
    ConsultationSubscriptionValidation.createConsultationSubscriptionPaymentIntentValidationSchema,
  ),
  ConsultationSubscriptionControllers.createConsultationSubscriptionPaymentIntent,
);

router.get(
  '/user/:email',
  ConsultationSubscriptionControllers.getSingleConsultationSubscription,
);

router.get(
  '/active',
  ConsultationSubscriptionControllers.getAllActiveConsultationSubscriptions,
);

router.get(
  '/used',
  ConsultationSubscriptionControllers.getAllUsedConsultationSubscriptions,
);

router.get(
  '/expired',
  ConsultationSubscriptionControllers.getAllExpiredConsultationSubscriptions,
);

export const ConsultationSubscriptionRoutes = router;

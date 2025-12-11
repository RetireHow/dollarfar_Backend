import express from 'express';
import { ConsultationSubscriptionControllers } from './consultationSubscription.controller';
import { ConsultationSubscriptionValidation } from './consultationSubscription.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

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
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationSubscriptionControllers.getAllActiveConsultationSubscriptions,
);

router.get(
  '/used',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationSubscriptionControllers.getAllUsedConsultationSubscriptions,
);

router.get(
  '/expired',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationSubscriptionControllers.getAllExpiredConsultationSubscriptions,
);

export const ConsultationSubscriptionRoutes = router;

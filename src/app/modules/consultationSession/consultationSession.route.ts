import express from 'express';
import { ConsultationSessionControllers } from './consultationSession.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ConsultationSessionValidation } from './consultationSession.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/book',
  validateRequest(
    ConsultationSessionValidation.bookConsultationSessionValidationSchema,
  ),
  ConsultationSessionControllers.bookConsultationSession,
);

router.get(
  '/scheduled',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationSessionControllers.getAllConsultationSessions,
);

router.get(
  '/user/:email',
  ConsultationSessionControllers.getUserConsultationSessions,
);

router.get(
  '/scheduled/:sessionId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationSessionControllers.getSingleConsultationSession,
);

export const ConsultationSessionRoutes = router;

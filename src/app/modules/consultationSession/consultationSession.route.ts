import express from 'express';
import { ConsultationSessionControllers } from './consultationSession.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ConsultationSessionValidation } from './consultationSession.validation';

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
  ConsultationSessionControllers.getAllConsultationSessions,
);

router.get(
  '/user/:email',
  ConsultationSessionControllers.getUserConsultationSessions,
);

router.get(
  '/scheduled/:sessionId',
  ConsultationSessionControllers.getSingleConsultationSession,
);

router.get(
  '/scheduled/slots/:date',
  ConsultationSessionControllers.getAllConsultationSessionSlots,
);

export const ConsultationSessionRoutes = router;

import express from 'express';
import { ConsultationScheduleConfigControllers } from './consultationScheduleConfig.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationScheduleConfigControllers.createConsultationScheduleConfig,
);

router.get(
  '/:date',
  ConsultationScheduleConfigControllers.getAllConsultationSessionSlots,
);

router.put(
  '/:configId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationScheduleConfigControllers.updateConsultationScheduleConfig,
);

router.get(
  '/schedule/config',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ConsultationScheduleConfigControllers.getConsultationScheduleConfig,
);

export const ConsultationScheduleConfigRoutes = router;

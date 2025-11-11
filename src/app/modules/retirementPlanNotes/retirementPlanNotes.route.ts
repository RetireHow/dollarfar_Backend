import express from 'express';
import { RetirementPlanNotesControllers } from './retirementPlanNotes.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RetirementPlanNotesValidation } from './retirementPlanNotes.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    RetirementPlanNotesValidation.createRetirementPlanNotesValidationSchema,
  ),
  RetirementPlanNotesControllers.createRetirementPlanNotes,
);

router.get(
  '/:planId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementPlanNotesControllers.getRetirementPlanNotes,
);

router.delete(
  '/:noteId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementPlanNotesControllers.removeRetirementPlanNotes,
);

router.patch(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    RetirementPlanNotesValidation.updateRetirementPlanNotesValidationSchema,
  ),
  RetirementPlanNotesControllers.updateRetirementPlanNotes,
);

export const RetirementPlanNotesRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { RetirementPlanEmailControllers } from './retirementPlanEmail.controller';
import { RetirementPlanEmailValidation } from './retirementPlanEmail.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    RetirementPlanEmailValidation.createRetirementPlanEmailValidationSchema,
  ),
  RetirementPlanEmailControllers.createRetirementPlanEmail,
);

router.get(
  '/:planId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementPlanEmailControllers.getRetirementPlanEmails,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementPlanEmailControllers.removeRetirementPlanEmail,
);

export const RetirementPlanEmailRoutes = router;

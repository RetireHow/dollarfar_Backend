import express from 'express';
import { RetirementNextStepControllers } from './retirementNextStepPlan.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RetirementNextStepValidation } from './retirementNextStepPlan.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(
    RetirementNextStepValidation.createRetirementNextStepValidationSchema,
  ),
  RetirementNextStepControllers.createRetirementNextStepPlan,
);
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementNextStepControllers.getAllRetirementNextStepPlans,
);

export const RetirementNextStepPlanRoutes = router;

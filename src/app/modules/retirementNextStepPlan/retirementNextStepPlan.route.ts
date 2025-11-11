import express from 'express';
import { RetirementNextStepControllers } from './retirementNextStepPlan.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', RetirementNextStepControllers.createRetirementNextStepPlan);
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RetirementNextStepControllers.getAllRetirementNextStepPlans,
);

export const RetirementNextStepPlanRoutes = router;

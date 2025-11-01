import express from 'express';
import { RetirementNextStepControllers } from './retirementNextStep.controller';

const router = express.Router();

router.post(
  '/create',
  RetirementNextStepControllers.createRetirementNextStep,
);
router.get('/get', RetirementNextStepControllers.getRetirementNextSteps);

export const RetirementNextStepRoutes = router;

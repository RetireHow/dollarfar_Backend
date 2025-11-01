import express from 'express';
import { RetirementPlanNotesControllers } from './retirementPlanNotes.controller';

const router = express.Router();

router.post(
  '/create',
  RetirementPlanNotesControllers.createRetirementPlanNotes,
);
router.get('/get/:planId', RetirementPlanNotesControllers.getRetirementPlanNotes);

export const RetirementPlanNotesRoutes = router;

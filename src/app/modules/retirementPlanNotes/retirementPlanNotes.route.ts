import express from 'express';
import { RetirementPlanNotesControllers } from './retirementPlanNotes.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RetirementPlanNotesValidation } from './retirementPlanNotes.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    RetirementPlanNotesValidation.createRetirementPlanNotesValidationSchema,
  ),
  RetirementPlanNotesControllers.createRetirementPlanNotes,
);

router.get(
  '/get/:planId',
  RetirementPlanNotesControllers.getRetirementPlanNotes,
);

router.delete(
  '/remove/:noteId',
  RetirementPlanNotesControllers.removeRetirementPlanNotes,
);

router.patch(
  '/update',
  validateRequest(
    RetirementPlanNotesValidation.updateRetirementPlanNotesValidationSchema,
  ),
  RetirementPlanNotesControllers.updateRetirementPlanNotes,
);

export const RetirementPlanNotesRoutes = router;

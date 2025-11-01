import { z } from 'zod';

const createRetirementPlanNotesValidationSchema = z.object({
  content: z.string({
    invalid_type_error: 'Content must be string',
    required_error: 'Content is required',
  }),
  retirementPlan: z.string({
    invalid_type_error: 'Retirement Plan must be string',
    required_error: 'Retirement Plan is required',
  }),
  creaedBy: z.string({
    invalid_type_error: 'Content creator must be string',
    required_error: 'Content creator is required',
  }),
});

export const RetirementPlanNotesValidation = {
  createRetirementPlanNotesValidationSchema,
};

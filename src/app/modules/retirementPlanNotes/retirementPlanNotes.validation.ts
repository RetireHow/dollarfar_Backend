import mongoose from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z
  .string()
  .refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId format',
  });

const createRetirementPlanNotesValidationSchema = z.object({
  body: z.object({
    content: z.string({
      invalid_type_error: 'Content must be string',
      required_error: 'Content is required',
    }),
    retirementPlan: z.string({
      invalid_type_error: 'Retirement Plan must be string',
      required_error: 'Retirement Plan is required',
    }),
    createdBy: z.string({
      invalid_type_error: 'Content creator must be string',
      required_error: 'Content creator is required',
    }),
  }),
});

const updateRetirementPlanNotesValidationSchema = z.object({
  body: z.object({
    content: z.string({
      invalid_type_error: 'Content must be string',
      required_error: 'Content is required',
    }),
    noteId: objectIdSchema,
  }),
});

export const RetirementPlanNotesValidation = {
  createRetirementPlanNotesValidationSchema,
  updateRetirementPlanNotesValidationSchema,
};

import mongoose from 'mongoose';
import { z } from 'zod';

const userObjectIdSchema = z
  .string({
    invalid_type_error: 'User Id must be mongodb object Id.',
    required_error: 'User Id is required.',
  })
  .refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId format',
  });

const planObjectIdSchema = z
  .string({
    invalid_type_error: 'User Id must be mongodb object Id.',
    required_error: 'Plan Id is required.',
  })
  .refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId format',
  });

const createRetirementPlanEmailValidationSchema = z.object({
  body: z.object({
    subject: z.string({
      invalid_type_error: 'Subject must be string',
      required_error: 'Subject is required',
    }),
    body: z.string({
      invalid_type_error: 'Body must be string',
      required_error: 'Body is required',
    }),
    userId: userObjectIdSchema,
    planId: planObjectIdSchema,
  }),
});

export const RetirementPlanEmailValidation = {
  createRetirementPlanEmailValidationSchema,
};

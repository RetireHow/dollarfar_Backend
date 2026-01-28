import { z } from 'zod';

const createPOCInterestValidationSchema = z.object({
  body: z.object({
    full_name: z.string({
      invalid_type_error: 'First name must be string',
      required_error: 'First name is required',
    }),
    email: z.string({
      invalid_type_error: 'Email must be string',
      required_error: 'Email is required',
    }),
    phone: z.string({
      invalid_type_error: 'Phone must be string',
      required_error: 'Phone is required',
    }),
    country: z.string().optional(),
    participating_as: z.string().optional(),
    duration: z.string().optional(),
    persona: z.array(z.string()).default([]),
    what_to_validate: z.string().optional(),
    ack: z.boolean({
      invalid_type_error: 'Acknowledgement must be boolean',
      required_error: 'Acknowledgement is required',
    }),
  }),
});

export const POCInterestValidation = {
  createPOCInterestValidationSchema,
};

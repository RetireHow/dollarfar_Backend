import { Types } from 'mongoose';
import { z } from 'zod';

const contactInfoSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  region: z.string({
    required_error: 'Region is required',
    invalid_type_error: 'Region must be string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be string',
  }),
});

// Main schema
const bookConsultationSessionValidationSchema = z.object({
  body: z.object({
    subscription: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid MongoDB ObjectId format',
    }),
    scheduled_by: z.string().optional(),

    contact: contactInfoSchema,
    slot: z.string().datetime({
      message:
        'Invalid ISO 8601 date format. Example: 2024-01-15T14:30:00.000Z',
    }),
    userTZ: z.string(),
    userTZ_IANA: z.string(),
  }),
});

export const ConsultationSessionValidation = {
  bookConsultationSessionValidationSchema,
};

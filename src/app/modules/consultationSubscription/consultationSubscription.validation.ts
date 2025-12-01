import { z } from 'zod';

// Subscription Payment Schema
const createConsultationSubscriptionValidationSchema = z.object({
  userEmail: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  userPhone: z.string().min(1, 'Phone is required'),
  userName: z
    .string()
    .min(1, 'User name is required')
    .max(100, 'User name too long'),
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  stripeSubscriptionId: z.string().optional(),
  amountPaid: z.number().min(0, 'Amount paid cannot be negative').default(199),
  currency: z.string().default('CAD'),
  sessionsPurchased: z
    .number()
    .int()
    .min(1, 'At least 1 session must be purchased')
    .default(2),
  sessionsUsed: z
    .number()
    .int()
    .min(0, 'Sessions used cannot be negative')
    .default(0),
  purchaseDate: z.date().default(() => new Date()),
  expiryDate: z
    .date()
    .refine(date => date > new Date(), 'Expiry date must be in the future'),
  status: z.enum(['active', 'expired', 'used', 'cancelled']).default('active'),
});

const createConsultationSubscriptionPaymentIntentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be string.',
    }),
    phone: z.string({
      required_error: 'phone is required.',
      invalid_type_error: 'phone must be string.',
    }),
    email: z.string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be string.',
    }),
  }),
});

export const ConsultationSubscriptionValidation = {
  createConsultationSubscriptionValidationSchema,
  createConsultationSubscriptionPaymentIntentValidationSchema,
};

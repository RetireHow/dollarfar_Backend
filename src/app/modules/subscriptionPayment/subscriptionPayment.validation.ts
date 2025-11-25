import { z } from 'zod';

// Customer Schema
export const customerSchema = z.object({
  name: z.string().min(1, 'Customer name is required').trim(),
  email: z
    .string()
    .min(1, 'Customer email is required')
    .email('Invalid email format')
    .trim()
    .toLowerCase(),
  phone: z.string().min(1, 'Customer phone is required').trim(),
  customerId: z.string().min(1, 'Stripe customer ID is required'),
});

// Subscription Payment Schema
export const createSubscriptionPaymentValidationSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  customer: customerSchema,
  amount: z
    .number()
    .min(0, 'Amount cannot be negative')
    .int('Amount must be an integer'), // Assuming amount is in cents
  currency: z
    .enum(['CAD', 'USD', 'EUR'], {
      errorMap: () => ({ message: 'Currency must be CAD, USD, or EUR' }),
    })
    .default('CAD'),
  status: z
    .enum(
      [
        'processing',
        'succeeded',
        'failed',
        'requires_payment_method',
        'canceled',
      ],
      {
        errorMap: () => ({
          message:
            'Status must be processing, succeeded, failed, requires_payment_method, or canceled',
        }),
      },
    )
    .default('processing'),
});

export const SubscriptionPaymentValidation = {
  createSubscriptionPaymentValidationSchema,
};

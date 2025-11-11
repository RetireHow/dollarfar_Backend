import { z } from 'zod';

const createRetirementNextStepValidationSchema = z.object({
  full_name: z.string().trim().min(1, 'Full name is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  email: z
    .string()
    .email('Invalid email address')
    .trim()
    .min(1, 'Email is required'),

  region: z.string().trim().optional(),
  target_age: z.string().trim().optional(),
  desired_income: z.string().trim().optional(),
  estimated_savings: z.string().trim().optional(),
  estimated_home_equity: z.string().trim().optional(),
  equity_comfort: z.string().trim().optional(),
  country_region: z.string().trim().optional(),
  ideal_locations: z.string().trim().optional(),
  months_abroad: z.string().trim().optional(),
  start_timeline: z.string().trim().optional(),
  travel_style: z.string().trim().optional(),
  independent_travel_ack: z.boolean().default(false),
  home_spend_monthly: z.string().trim().optional(),
  abroad_budget_season: z.string().trim().optional(),
  flights_insurance_budget: z.string().trim().optional(),
  flight_class: z.string().trim().optional(),
  travel_purpose: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  fee_ack: z.boolean().default(false),
  consent_contact: z.boolean().default(false),
  consent_marketing: z.boolean().default(false),
});

export const RetirementNextStepValidation = {
  createRetirementNextStepValidationSchema,
};

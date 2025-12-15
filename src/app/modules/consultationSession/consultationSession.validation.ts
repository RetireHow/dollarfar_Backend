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

const retirementSnapshotSchema = z.object({
  target_age: z.string().optional(),
  desired_income: z.string().optional(),
  estimated_savings: z.string().optional(),
});

const housingEquitySchema = z.object({
  estimated_home_equity: z.string().optional(),
  equity_comfort: z.string().optional(),
});

const dollarFarPlanningSchema = z.object({
  calculators: z.array(z.string()).optional(),
  interpretation_toggle: z.boolean(),
  consultation_time: z.string(),
});

const travelPlanningSchema = z.object({
  months_abroad: z.string().optional(),
  start_timeline: z.string().optional(),
  travel_style: z.string().optional(),
  independent_travel_ack: z.boolean().optional(),
  country_region_interest: z.string().optional(),
  ideal_locations_interest: z.string().optional(),
});

const budgetEstimatesSchema = z.object({
  home_spend_monthly: z.string().optional(),
  abroad_budget_season: z.string().optional(),
  flights_insurance_budget: z.string().optional(),
  flight_class: z.string().optional(),
});

const privacyAcknowledgementsSchema = z.object({
  ack_poc: z.boolean().optional(),
  consent_contact: z.boolean().optional(),
  ack_scope: z.boolean().optional(),
});

// Main schema
const bookConsultationSessionValidationSchema = z.object({
  body: z.object({
    subscription: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid MongoDB ObjectId format',
    }),
    scheduled_by: z.string().optional(),

    contact: contactInfoSchema,
    retirement_snapshot: retirementSnapshotSchema.optional(),
    housing_equity: housingEquitySchema.optional(),
    dollarfar_planning: dollarFarPlanningSchema.optional(),
    travel_planning: travelPlanningSchema.optional(),
    travel_purposes: z.array(z.string()).optional(),
    budget_estimates: budgetEstimatesSchema.optional(),
    privacy_acknowledgements: privacyAcknowledgementsSchema.optional(),
    slot: z.string().datetime({
      message:
        'Invalid ISO 8601 date format. Example: 2024-01-15T14:30:00.000Z',
    }),
    userTZ: z.string(),
  }),
});

export const ConsultationSessionValidation = {
  bookConsultationSessionValidationSchema,
};

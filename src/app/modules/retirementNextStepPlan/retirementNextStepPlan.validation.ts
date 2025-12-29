import { z } from 'zod';

// Sub-schemas for nested objects
const ContactInfoSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string.',
      required_error: 'Name is required.',
    })
    .trim(),
  phone: z
    .string({
      invalid_type_error: 'Phone number must be string.',
      required_error: 'Phone number is required.',
    })
    .trim(),
  email: z
    .string({
      invalid_type_error: 'Email must be string.',
      required_error: 'Email is required.',
    })
    .email('Invalid email address')
    .trim(),
  region: z
    .string({
      required_error: 'State/Province is required',
      invalid_type_error: 'State/Province must be string',
    })
    .trim(),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be string',
    })
    .trim(),
});

const RetirementSnapshotSchema = z.object({
  target_age: z.string().trim().optional(),
  desired_income: z.string().trim().optional(),
  estimated_savings: z.string().trim().optional(),
});

const HousingEquitySchema = z.object({
  estimated_home_equity: z.string().trim().optional(),
  equity_comfort: z.string().trim().optional(),
});

const DollarFarPlanningSchema = z.object({
  calculators: z.array(z.string()).default([]),
  interpretation_toggle: z.boolean().default(false),
});

const TravelPlanningSchema = z.object({
  months_abroad: z.string().trim().optional(),
  start_timeline: z.string().trim().optional(),
  travel_style: z.string().trim().optional(),
  independent_travel_ack: z.boolean().default(false),
  country_region_interest: z.string().trim().optional(),
  ideal_locations_interest: z.string().trim().optional(),
});

const BudgetEstimatesSchema = z.object({
  home_spend_monthly: z.string().trim().optional(),
  abroad_budget_season: z.string().trim().optional(),
  flights_insurance_budget: z.string().trim().optional(),
  flight_class: z.string().trim().optional(),
});

const PrivacyAcknowledgementsSchema = z.object({
  ack_poc: z.boolean().default(false),
  consent_contact: z.boolean().default(false),
  ack_scope: z.boolean().default(false),
});

// Main validation schema
const createRetirementNextStepValidationSchema = z.object({
  body: z.object({
    contact: ContactInfoSchema,
    retirement_snapshot: RetirementSnapshotSchema.default({}),
    housing_equity: HousingEquitySchema.default({}),
    dollarfar_planning: DollarFarPlanningSchema.default({}),
    travel_planning: TravelPlanningSchema.default({}),
    budget_estimates: BudgetEstimatesSchema.default({}),
    travel_purposes: z.array(z.string()).default([]),
    privacy_acknowledgements: PrivacyAcknowledgementsSchema.refine(
      data => data.ack_poc && data.ack_scope,
      {
        message: 'All privacy acknowledgements must be accepted',
      },
    ),
  }),
});

const createRetirementSubscriptionPaymentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string.',
        required_error: 'Name is required.',
      })
      .trim(),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be string.',
        required_error: 'Phone number is required.',
      })
      .trim(),
    email: z
      .string({
        invalid_type_error: 'Email must be string.',
        required_error: 'Email is required.',
      })
      .email('Invalid email address')
      .trim(),
    region: z.string().trim().optional(),
  }),
});

// Update validation schema (all fields optional for partial updates)
const updateRetirementNextStepValidationSchema =
  createRetirementNextStepValidationSchema.partial();

export const RetirementNextStepValidation = {
  createRetirementNextStepValidationSchema,
  updateRetirementNextStepValidationSchema,
  createRetirementSubscriptionPaymentValidationSchema,
};

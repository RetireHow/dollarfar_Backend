import { model, Schema } from 'mongoose';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';

const retirementNextStepSchema = new Schema<TRetirementNextStep>(
  {
    full_name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    region: { type: String, trim: true },
    target_age: { type: String, trim: true },
    desired_income: { type: String, trim: true },
    estimated_savings: { type: String, trim: true },
    estimated_home_equity: { type: String, trim: true },
    equity_comfort: { type: String, trim: true },
    country_region: { type: String, trim: true },
    ideal_locations: { type: String, trim: true },
    months_abroad: { type: String, trim: true },
    start_timeline: { type: String, trim: true },
    travel_style: { type: String, trim: true },
    independent_travel_ack: { type: Boolean },
    home_spend_monthly: { type: String, trim: true },
    abroad_budget_season: { type: String, trim: true },
    flights_insurance_budget: { type: String, trim: true },
    flight_class: { type: String, trim: true },
    travel_purpose: { type: [String], trim: true },
    interests: { type: [String], trim: true },
    fee_ack: { type: Boolean },
    consent_contact: { type: Boolean },
    consent_marketing: { type: Boolean },
  },
  { timestamps: true, versionKey: false },
);

export const RetirementNextStepModel = model<TRetirementNextStep>(
  'RetirementNextStep',
  retirementNextStepSchema,
);

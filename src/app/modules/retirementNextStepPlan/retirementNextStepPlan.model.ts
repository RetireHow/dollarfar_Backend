import { model, Schema } from 'mongoose';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';

const ContactInfoSchema = new Schema(
  {
    full_name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      match: [/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    region: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const RetirementSnapshotSchema = new Schema(
  {
    target_age: {
      type: String,
      trim: true,
    },
    desired_income: {
      type: String,
      trim: true,
    },
    estimated_savings: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const HousingEquitySchema = new Schema(
  {
    estimated_home_equity: {
      type: String,
      trim: true,
    },
    equity_comfort: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const DollarFarPlanningSchema = new Schema(
  {
    calculators: { type: [String], trim: true },
    interpretation_toggle: { type: Boolean, default: false },
    name_pre: {
      type: String,
      trim: true,
    },
    email_pre: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    phone_pre: {
      type: String,
      trim: true,
      match: [/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'],
    },
    time_pre: {
      type: String,
      trim: true,
    },
    subscription_status: {
      type: String,
      enum: ['', 'have', 'start', 'paid'],
      default: '',
    },
    subscription_payment_intent: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const TravelPlanningSchema = new Schema(
  {
    months_abroad: {
      type: String,
      trim: true,
    },
    start_timeline: {
      type: String,
      trim: true,
    },
    travel_style: {
      type: String,
      trim: true,
    },
    independent_travel_ack: { type: Boolean, default: false },
    country_region_interest: {
      type: String,
      trim: true,
    },
    ideal_locations_interest: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const BudgetEstimatesSchema = new Schema(
  {
    home_spend_monthly: {
      type: String,
      trim: true,
    },
    abroad_budget_season: {
      type: String,
      trim: true,
    },
    flights_insurance_budget: {
      type: String,
      trim: true,
    },
    flight_class: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const PrivacyAcknowledgementsSchema = new Schema(
  {
    ack_poc: { type: Boolean, default: false },
    consent_contact: { type: Boolean, default: false },
    ack_scope: { type: Boolean, default: false },
  },
  { _id: false },
);

// Main schema
const retirementNextStepSchema = new Schema<TRetirementNextStep>(
  {
    contact: {
      type: ContactInfoSchema,
      required: true,
    },
    retirement_snapshot: {
      type: RetirementSnapshotSchema,
      default: {},
    },
    housing_equity: {
      type: HousingEquitySchema,
      default: {},
    },
    dollarfar_planning: {
      type: DollarFarPlanningSchema,
      default: {},
    },
    travel_planning: {
      type: TravelPlanningSchema,
      default: {},
    },
    budget_estimates: {
      type: BudgetEstimatesSchema,
      default: {},
    },
    travel_purpose: { type: [String], trim: true },
    privacy_acknowledgements: {
      type: PrivacyAcknowledgementsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const RetirementNextStepModel = model<TRetirementNextStep>(
  'RetirementNextStep',
  retirementNextStepSchema,
);

import { model, Schema } from 'mongoose';

import {
  IBudgetEstimates,
  IConsultationSession,
  IContactInfo,
  IDollarFarPlanning,
  IHousingEquity,
  IPrivacyAcknowledgements,
  IRetirementSnapshot,
  ITravelPlanning,
} from './consultationSession.interface';

// Sub-schemas
const contactSchema = new Schema<IContactInfo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String },
  },
  { _id: false },
);

const retirementSnapshotSchema = new Schema<IRetirementSnapshot>(
  {
    target_age: { type: String },
    desired_income: { type: String },
    estimated_savings: { type: String },
  },
  { _id: false },
);

const housingEquitySchema = new Schema<IHousingEquity>(
  {
    estimated_home_equity: { type: String },
    equity_comfort: { type: String },
  },
  { _id: false },
);

const dollarFarPlanningSchema = new Schema<IDollarFarPlanning>(
  {
    calculators: [{ type: String }],
    interpretation_toggle: { type: Boolean },
    consultation_time: { type: String, required: true },
  },
  { _id: false },
);

const travelPlanningSchema = new Schema<ITravelPlanning>(
  {
    months_abroad: { type: String },
    start_timeline: { type: String },
    travel_style: { type: String },
    independent_travel_ack: { type: Boolean },
    country_region_interest: { type: String },
    ideal_locations_interest: { type: String },
  },
  { _id: false },
);

const budgetEstimatesSchema = new Schema<IBudgetEstimates>(
  {
    home_spend_monthly: { type: String },
    abroad_budget_season: { type: String },
    flights_insurance_budget: { type: String },
    flight_class: { type: String },
  },
  { _id: false },
);

const privacyAcknowledgementsSchema = new Schema<IPrivacyAcknowledgements>(
  {
    ack_poc: { type: Boolean },
    consent_contact: { type: Boolean },
    ack_scope: { type: Boolean },
  },
  { _id: false },
);

// Main Consultation Session Schema
const consultationSessionSchema = new Schema<IConsultationSession>(
  {
    slot: { type: Date, required: true, unique: true, index: true },
    userTZ: { type: String, required: true },
    providerTZ: { type: String, required: true },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: 'ConsultationSubscription',
      required: true,
    },
    session_number: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    sessions_remaining: {
      type: Number,
      required: true,
    },
    session_duration: {
      type: Number,
      default: 30, // minutes
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    scheduled_by: {
      type: String,
      default: 'user', // or 'admin'
    },
    contact: contactSchema,
    retirement_snapshot: retirementSnapshotSchema,
    housing_equity: housingEquitySchema,
    dollarfar_planning: dollarFarPlanningSchema,
    travel_planning: travelPlanningSchema,
    travel_purposes: { type: [String], trim: true },
    budget_estimates: budgetEstimatesSchema,
    privacy_acknowledgements: privacyAcknowledgementsSchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ConsultationSession = model<IConsultationSession>(
  'ConsultationSession',
  consultationSessionSchema,
);

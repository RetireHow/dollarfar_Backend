import { model, Schema } from 'mongoose';

import {
  IConsultationSession,
  IContactInfo,
} from './consultationSession.interface';

// Sub-schemas
const contactSchema = new Schema<IContactInfo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

// Main Consultation Session Schema
const consultationSessionSchema = new Schema<IConsultationSession>(
  {
    slot: { type: Date, required: true, unique: true, index: true },
    userTZ: { type: String, required: true },
    userTZ_IANA: { type: String, required: true },
    consultantTZ: { type: String, required: true },
    consultantTZ_IANA: { type: String, required: true },
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

import { model, Schema } from 'mongoose';
import { TConsultationSubscription } from './consultationSubscription.interface';

const consultationSubscriptionSchema = new Schema<TConsultationSubscription>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    amountPaid: {
      type: Number,
      required: true,
      default: 199,
    },
    currency: {
      type: String,
      default: 'CAD',
    },
    sessionsPurchased: {
      type: Number,
      default: 2,
    },
    sessionsUsed: {
      type: Number,
      default: 0,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'used', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ConsultationSubscription = model<TConsultationSubscription>(
  'ConsultationSubscription',
  consultationSubscriptionSchema,
);

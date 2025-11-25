import { model, Schema } from 'mongoose';
import { TSubscriptionPayment } from './subscriptionPayment.interface';

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
    }
  },
  { _id: false },
);

const subscriptionPaymentSchema = new Schema(
  {
    paymentIntentId: {
      type: String,
      required: [true, 'Payment intent ID is required'],
      unique: true,
    },
    customer: {
      type: customerSchema,
      required: [true, 'Customer information is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      default: 'cad',
      uppercase: true,
      enum: {
        values: ['CAD', 'USD', 'EUR'],
        message: 'Currency must be CAD, USD, or EUR',
      },
    },
    status: {
      type: String,
      required: [true, 'Payment status is required'],
      enum: {
        values: [
          'processing',
          'succeeded',
          'failed',
          'requires_payment_method',
          'canceled',
        ],
        message:
          'Status must be processing, succeeded, failed, requires_payment_method, or canceled',
      },
      default: 'processing',
    },
  },
  { timestamps: true, versionKey: false },
);

export const SubscriptionPayment = model<TSubscriptionPayment>(
  'SubscriptionPayment',
  subscriptionPaymentSchema,
);

import { model, Schema } from 'mongoose';
import { IPOCInterest } from './POCInterest.interface';

const POCInterestSchema = new Schema<IPOCInterest>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    participating_as: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    persona: { type: [String], default: [] },
    what_to_validate: {
      type: String,
      trim: true,
    },
    ack: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const POCInterest = model<IPOCInterest>(
  'POCInterest',
  POCInterestSchema,
);

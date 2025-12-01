import { model, Schema } from 'mongoose';
import { TRetirementPlanEmail } from './retirementPlanEmail.interface';

const retirementPlanEmailSchema = new Schema<TRetirementPlanEmail>(
  {
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'RetirementNextStep',
    },
  },
  { timestamps: true, versionKey: false },
);

export const RetirementPlanEmail = model<TRetirementPlanEmail>(
  'RetirementPlanEmail',
  retirementPlanEmailSchema,
);

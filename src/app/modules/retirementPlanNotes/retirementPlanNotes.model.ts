import { model, Schema } from 'mongoose';
import { TRetirementPlanNotes } from './retirementPlanNotes.interface';

const retirementPlanNotesSchema = new Schema<TRetirementPlanNotes>(
  {
    content: {
      type: String,
      required: true,
    },
    retirementPlan: {
      type: Schema.Types.ObjectId,
      ref: 'RetirementNextStep'
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const RetirementPlanNotesModel = model<TRetirementPlanNotes>(
  'RetirementPlanNote',
  retirementPlanNotesSchema,
);

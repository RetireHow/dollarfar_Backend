import { Types } from 'mongoose';

export interface TRetirementPlanNotes {
  retirementPlan: Types.ObjectId;
  content: string;
  createdBy: string;
}

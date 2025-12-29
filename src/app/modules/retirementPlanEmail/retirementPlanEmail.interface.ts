import { Types } from 'mongoose';

export interface TRetirementPlanEmail {
  subject: string;
  body: string;
  userId: Types.ObjectId;
  planId: Types.ObjectId;
}

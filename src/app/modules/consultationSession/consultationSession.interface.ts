import { Types } from 'mongoose';

// Sub-interfaces
export type IContactInfo = {
  name: string;
  phone: string;
  email: string;
  region: string;
  country: string;
};

// Main Interface
export interface IConsultationSession {
  _id?: string;
  subscription: Types.ObjectId;
  session_number: number;
  sessions_remaining: number;
  session_duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  scheduled_by: string;
  contact: IContactInfo;

  isDeleted: boolean;
  slot: Date;
  userTZ:string;
  userTZ_IANA:string;
  consultantTZ:string;
  consultantTZ_IANA:string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

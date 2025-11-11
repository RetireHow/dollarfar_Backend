import { Types } from 'mongoose';

export interface TAdmin {
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  city: string;
  designation: string;
  user: Types.ObjectId;
  isDeleted: boolean;
}

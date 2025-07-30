import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const AdminModel = model<TAdmin>('Admin', adminSchema);

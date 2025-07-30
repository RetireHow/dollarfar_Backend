import { model, Schema } from 'mongoose';
import { TOTP } from './otp.interface';

const otpSchema = new Schema<TOTP>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const OTPModel = model<TOTP>('Otp', otpSchema);

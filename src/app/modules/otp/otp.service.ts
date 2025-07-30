import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AdminModel } from '../admin/admin.model';
import { OTPModel } from './otp.model';
import crypto from 'crypto';
import sendOTPMail from '../../utils/sendOTPMail';
import bcrypt from 'bcrypt';

const sendOTPMailFromDB = async (email: string) => {
  const existingUser = await AdminModel.findOne({ email });
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  const createdOTP = await OTPModel.findOneAndUpdate(
    { email },
    { email, otp, isVerified: false },
    { upsert: true, new: true },
  );

  await sendOTPMail({
    name: existingUser.name,
    email: existingUser.email,
    otp,
  });

  return createdOTP;
};

const verifyOTPFromDB = async (email: string, otpCode: string) => {
  const existingUser = await AdminModel.findOne({ email });
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const otpRecord = await OTPModel.findOne({ email, otp: otpCode });
  if (!otpRecord) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP!');
  }

  const updatedOtp = await OTPModel.findByIdAndUpdate(
    { _id: otpRecord._id },
    { isVerified: true },
    { new: true },
  ); // Delete OTP after successful verification
  return updatedOtp;
};

const resetPasswordFromDB = async (
  email: string,
  otpCode: string,
  newPassword: string,
) => {
  const existingUser = await AdminModel.findOne({ email });
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const otpRecord = await OTPModel.findOne({ email, otp: otpCode });
  if (!otpRecord) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP!');
  }

  // hash password
  const hashedPwd = await bcrypt.hash(newPassword, 12);
  await AdminModel.findByIdAndUpdate(
    { _id: existingUser?._id },
    { password: hashedPwd },
  );

  await OTPModel.deleteOne({ _id: otpRecord._id }); // Delete OTP after successful verification
  return null;
};

export const OTPServices = {
  sendOTPMailFromDB,
  verifyOTPFromDB,
  resetPasswordFromDB,
};

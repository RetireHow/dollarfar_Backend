import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AdminModel } from '../admin/admin.model';
import { OTPModel } from './otp.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';

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

  // Send OTP Mail
  const zeptoRes = await sendZeptoEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ed955e60-15f7-11f0-b652-2655081e6903.1961f478746',
    to: [{ address: email, name: existingUser.name }],
    mergeInfo: {
      name: existingUser.name,
      otp: otp,
    },
  });
  if (zeptoRes.error) {
    throw zeptoRes.error;
  }

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

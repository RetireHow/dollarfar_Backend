/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { User } from '../user/user.model';
import crypto from 'crypto';
import { OTPModel } from '../otp/otp.model';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { sendTemplatedEmail } from '../../utils/sendTemplatedEmail';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');

  //create token and sent to the  client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const logoutUserFromDB = async (req: Request, res: Response) => {
  // 2️⃣ Remove the refresh token cookie from browser
  res.cookie('refreshToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const sendOTPMailFromDB = async (email: string) => {
  const existingUser = await User.findOne({ email });
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
  const zeptoRes = await sendTemplatedEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ed955e60-15f7-11f0-b652-2655081e6903.1961f478746',
    to: [{ address: email, name: '' }],
    mergeInfo: {
      name: '',
      otp: otp,
    },
  });
  if (zeptoRes.error) {
    throw zeptoRes.error;
  }

  return createdOTP;
};

const verifyOTPFromDB = async (email: string, otpCode: string) => {
  const existingUser = await User.findOne({ email });
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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // checking if the user is exist
    const user = await User.findOne({ email })
      .select('+password')
      .session(session);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    //hash the new password
    const newHashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds),
    );

    const otpRecord = await OTPModel.findOne({ email, otp: otpCode }).session(
      session,
    );
    if (!otpRecord) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP!');
    }

    // Prevent using the same old password
    if (await User.isPasswordMatched(newPassword, user.password)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'New password must differ from the old one!',
      );
    }

    // Update password (transaction-1)
    const updateFields = {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    };
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      updateFields,
      { session, new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update password !',
      );
    }

    // Delete OTP (transaction-2)
    const deletedOtp = await OTPModel.deleteOne({
      _id: otpRecord._id,
    }).session(session); // Delete OTP after successful verification

    if (deletedOtp.deletedCount === 0) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete OTP !',
      );
    }

    await session.commitTransaction();
    return null;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    session.endSession();
  }
};

export const AuthServices = {
  loginUser,
  refreshToken,
  sendOTPMailFromDB,
  verifyOTPFromDB,
  resetPasswordFromDB,
  logoutUserFromDB,
};

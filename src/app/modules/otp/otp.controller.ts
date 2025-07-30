import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OTPServices } from './otp.service';

const sendOTPMail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await OTPServices.sendOTPMailFromDB(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP is sent successfully.',
    data: result,
  });
});

const verifyOTP = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const result = await OTPServices.verifyOTPFromDB(email, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP is verified successfully.',
    data: result,
  });
});

const resetPasword = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const result = await OTPServices.resetPasswordFromDB(email, otp, newPassword);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is reset successfully.',
    data: result,
  });
});

export const OTPControllers = {
  sendOTPMail,
  verifyOTP,
  resetPasword,
};

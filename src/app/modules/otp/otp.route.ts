import express from 'express';
import { OTPControllers } from './otp.controller';

const router = express.Router();

router.post('/send-otp', OTPControllers.sendOTPMail);
router.post('/verify-otp', OTPControllers.verifyOTP);
router.post('/reset-password', OTPControllers.resetPasword);

export const OTPRoutes = router;

import express from 'express';
import { ReportDownloadedUserControllers } from './reportDownloadedUser.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', ReportDownloadedUserControllers.createReportDownloadedUser);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ReportDownloadedUserControllers.getReportDownloadedUsers,
);

router.delete('/', ReportDownloadedUserControllers.deleteReportDownloadedUser);

export const ReportDownloadedUserRoutes = router;

import express from 'express';
import { ReportDownloadedUserControllers } from './reportDownloadedUser.controller';

const router = express.Router();

router.post(
  '/create-user',
  ReportDownloadedUserControllers.createReportDownloadedUser,
);

router.get(
  '/all-users',
  ReportDownloadedUserControllers.getReportDownloadedUsers,
);

router.delete(
  '/delete-user',
  ReportDownloadedUserControllers.deleteReportDownloadedUser,
);

export const ReportDownloadedUserRoutes = router;

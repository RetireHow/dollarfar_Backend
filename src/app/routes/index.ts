import { Router } from 'express';
import { NumbeoRoutes } from '../modules/numbeo/numbeo.route';
import { OTPRoutes } from '../modules/otp/otp.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ReportDownloadedUserRoutes } from '../modules/reportDownloadedUser/reportDownloadedUser.route';
import { EbookDownloadedUserRoutes } from '../modules/ebookDownloadedUser/ebookDownloadedUser.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { RetirementNextStepRoutes } from '../modules/retirementNextStep/retirementNextStep.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/numbeo',
    route: NumbeoRoutes,
  },
  {
    path: '/otp',
    route: OTPRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/report-downloaded-users',
    route: ReportDownloadedUserRoutes,
  },
  {
    path: '/ebook-downloaded-users',
    route: EbookDownloadedUserRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
  {
    path: '/retirement-next-step',
    route: RetirementNextStepRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

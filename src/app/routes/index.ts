import { Router } from 'express';
import { NumbeoRoutes } from '../modules/numbeo/numbeo.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ReportDownloadedUserRoutes } from '../modules/reportDownloadedUser/reportDownloadedUser.route';
import { EbookDownloadedUserRoutes } from '../modules/ebookDownloadedUser/ebookDownloadedUser.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { AndexRoutes } from '../modules/andex/andex.route';
import { RetirementPlanNotesRoutes } from '../modules/retirementPlanNotes/retirementPlanNotes.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { RetirementNextStepPlanRoutes } from '../modules/retirementNextStepPlan/retirementNextStepPlan.route';
import { RetirementPlanEmailRoutes } from '../modules/retirementPlanEmail/retirementPlanEmail.route';
import { ConsultationSessionRoutes } from '../modules/consultationSession/consultationSession.route';
import { ConsultationSubscriptionRoutes } from '../modules/consultationSubscription/consultationSubscription.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/numbeo',
    route: NumbeoRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
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
    path: '/retirement-next-step-plans',
    route: RetirementNextStepPlanRoutes,
  },
  {
    path: '/consultation-subscription',
    route: ConsultationSubscriptionRoutes,
  },
  {
    path: '/consultation-session',
    route: ConsultationSessionRoutes,
  },
  {
    path: '/retirement-plan-notes',
    route: RetirementPlanNotesRoutes,
  },
  {
    path: '/retirement-plan-email',
    route: RetirementPlanEmailRoutes,
  },
  {
    path: '/andex',
    route: AndexRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

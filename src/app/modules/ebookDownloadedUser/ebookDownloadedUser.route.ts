import express from 'express';
import { EbookDownloadedUserControllers } from './ebookDownloadedUser.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', EbookDownloadedUserControllers.createEbookDownloadedUser);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  EbookDownloadedUserControllers.getEbookDownloadedUsers,
);

router.post(
  '/create-checkout-session',
  EbookDownloadedUserControllers.createCheckoutSession,
);
router.get('/checkout-session', EbookDownloadedUserControllers.checkoutSession);

export const EbookDownloadedUserRoutes = router;

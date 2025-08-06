import express from 'express';
import { EbookDownloadedUserControllers } from './ebookDownloadedUser.controller';

const router = express.Router();

router.post(
  '/create-user',
  EbookDownloadedUserControllers.createEbookDownloadedUser,
);

router.get(
  '/all-users',
  EbookDownloadedUserControllers.getEbookDownloadedUsers,
);

router.post(
  '/create-checkout-session',
  EbookDownloadedUserControllers.createCheckoutSession,
);
router.get('/checkout-session', EbookDownloadedUserControllers.checkoutSession);

export const EbookDownloadedUserRoutes = router;

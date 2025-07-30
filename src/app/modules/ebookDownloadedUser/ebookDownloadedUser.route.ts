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

export const EbookDownloadedUserRoutes = router;

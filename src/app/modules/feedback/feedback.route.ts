import express from 'express';
import { FeedbackControllers } from './feedback.controller';

const router = express.Router();

router.post('/', FeedbackControllers.createFeedback);

router.get('/', FeedbackControllers.getAllFeedbacks);

router.delete('/:id', FeedbackControllers.deleteFeedback);

export const FeedbackRoutes = router;

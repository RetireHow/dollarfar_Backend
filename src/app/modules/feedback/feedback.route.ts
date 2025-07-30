import express from 'express';
import { FeedbackControllers } from './feedback.controller';

const router = express.Router();

router.post('/create-feedback', FeedbackControllers.createFeedback);

router.get('/get-feedbacks', FeedbackControllers.getFeedbacks);

export const FeedbackRoutes = router;

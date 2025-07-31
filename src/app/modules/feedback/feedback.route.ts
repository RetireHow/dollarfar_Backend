import express from 'express';
import { FeedbackControllers } from './feedback.controller';

const router = express.Router();

router.post('/create-feedback', FeedbackControllers.createFeedback);

router.get('/get-feedbacks', FeedbackControllers.getFeedbacks);

router.post('/insert-feedbacks', FeedbackControllers.insertFeedbacks);

router.delete('/delete-feedback', FeedbackControllers.deleteFeedback);

router.delete('/clear-feedbacks', FeedbackControllers.clearAllFeedbacks);

export const FeedbackRoutes = router;

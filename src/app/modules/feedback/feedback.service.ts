import { TFeedback } from './feedback.interface';
import { FeedbackModel } from './feedback.model';

const createFeedbackIntoDB = async (payload: TFeedback) => {
  const res = await FeedbackModel.create(payload);
  return res;
};

const getFeedbacksFromDB = async () => {
  const feedbackData = await FeedbackModel.find().sort({
    createdAt: 'desc',
  });
  return feedbackData;
};

export const FeedbackServices = {
  createFeedbackIntoDB,
  getFeedbacksFromDB,
};

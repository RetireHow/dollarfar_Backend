import httpStatus from 'http-status';
import { TFeedback } from './feedback.interface';
import { FeedbackModel } from './feedback.model';
import AppError from '../../errors/AppError';

const insertFeedbacksIntoDB = async (
  payload: { name: string; rating: number; city: string; comments: string }[],
) => {
  const feedbackData = await FeedbackModel.insertMany(payload);
  return feedbackData;
};

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

const deleteFeedbackFromDB = async (id: string) => {
  // check if the feedback exist
  const isExist = await FeedbackModel.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Feedback not found!');
  }
  const feedbackData = await FeedbackModel.findByIdAndDelete(id);
  return feedbackData;
};

const clearAllFeedbacksFromDB = async () => {
  const feedbackData = await FeedbackModel.deleteMany({});
  return feedbackData;
};

export const FeedbackServices = {
  createFeedbackIntoDB,
  getFeedbacksFromDB,
  clearAllFeedbacksFromDB,
  insertFeedbacksIntoDB,
  deleteFeedbackFromDB,
};

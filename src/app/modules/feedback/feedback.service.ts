import httpStatus from 'http-status';
import { TFeedback } from './feedback.interface';
import { FeedbackModel } from './feedback.model';
import AppError from '../../errors/AppError';

const createFeedbackIntoDB = async (payload: TFeedback) => {
  const res = await FeedbackModel.create(payload);
  return res;
};

const getAllFeedbacksFromDB = async () => {
  const feedbackData = await FeedbackModel.find().sort({
    createdAt: 'desc',
  });
  return feedbackData;
};

const deleteFeedbackFromDB = async (id: string) => {
  // check if the feedback exist
  const isExist = await FeedbackModel.findOne({_id:id});
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This feedback not found!');
  }
  const feedbackData = await FeedbackModel.findByIdAndDelete(id);
  return feedbackData;
};

export const FeedbackServices = {
  createFeedbackIntoDB,
  getAllFeedbacksFromDB,
  deleteFeedbackFromDB,
};

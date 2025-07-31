import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeedbackServices } from './feedback.service';

const createFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.createFeedbackIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A new feedback is created successfully.',
    data: result,
  });
});

const getFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.getFeedbacksFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks are retrieved successfully.',
    data: result,
  });
});

const clearAllFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.clearAllFeedbacksFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks are cleared successfully.',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req, res) => {
  const { id } = req.query;
  const result = await FeedbackServices.deleteFeedbackFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback is deleted successfully.',
    data: result,
  });
});

const insertFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.insertFeedbacksIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback is deleted successfully.',
    data: result,
  });
});

export const FeedbackControllers = {
  createFeedback,
  getFeedbacks,
  insertFeedbacks,
  deleteFeedback,
  clearAllFeedbacks,
};

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

export const FeedbackControllers = {
  createFeedback,
  getFeedbacks,
};

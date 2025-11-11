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

const getAllFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.getAllFeedbacksFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks are retrieved successfully.',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FeedbackServices.deleteFeedbackFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback is deleted successfully.',
    data: result,
  });
});

export const FeedbackControllers = {
  createFeedback,
  deleteFeedback,
  getAllFeedbacks,
};

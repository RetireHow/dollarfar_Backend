import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscriptionPaymentServices } from './subscriptionPayment.service';

const createSubscriptionPaymentIntent = catchAsync(async (req, res) => {
  const result =
    await SubscriptionPaymentServices.createSubscriptionPaymentIntentFromDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement subscription payment is created successfully.',
    data: result,
  });
});

const createSubscriptionPayment = catchAsync(async (req, res) => {
  const result =
    await SubscriptionPaymentServices.createSubscriptionPaymentIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription payment is created successfully.',
    data: result,
  });
});

const getSingleSubscriptionPayment = catchAsync(async (req, res) => {
  const { paymentIntentId } = req.params;
  const result =
    await SubscriptionPaymentServices.getSingleSubscriptionPaymentFromDB(
      paymentIntentId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription payment is retrieved successfully.',
    data: result,
  });
});

export const SubscriptionPaymentControllers = {
  createSubscriptionPayment,
  createSubscriptionPaymentIntent,
  getSingleSubscriptionPayment,
};

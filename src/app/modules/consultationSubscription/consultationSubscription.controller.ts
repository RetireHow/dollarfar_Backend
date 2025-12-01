import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ConsultationSubscriptionServices } from './consultationSubscription.service';

const createConsultationSubscriptionPaymentIntent = catchAsync(
  async (req, res) => {
    const result =
      await ConsultationSubscriptionServices.createConsultationSubscriptionPaymentIntentFromDB(
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Consultation payment intent is created successfully.',
      data: result,
    });
  },
);

const handleConsultationSubscriptionSuccessWebhook = catchAsync(
  async (req, res) => {
    const result =
      await ConsultationSubscriptionServices.handleConsultationSubscriptionSuccessWebhookIntoDB(
        req,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Consultation Subscription payment is created successfully.',
      data: result,
    });
  },
);

const getSingleConsultationSubscription = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result =
    await ConsultationSubscriptionServices.getSingleActiveConsultationSubscriptionFromDB(
      email,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Consultation subscription is retrieved successfully.',
    data: result,
  });
});

const getAllActiveConsultationSubscriptions = catchAsync(async (req, res) => {
  const result =
    await ConsultationSubscriptionServices.getAllActiveConsultationSubscriptionsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All valid subscription payments are retrieved successfully.',
    data: result,
  });
});

const getAllUsedConsultationSubscriptions = catchAsync(async (req, res) => {
  const result =
    await ConsultationSubscriptionServices.getAllUsedConsultationSubscriptionsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All used subscription payments are retrieved successfully.',
    data: result,
  });
});

const getAllExpiredConsultationSubscriptions = catchAsync(async (req, res) => {
  const result =
    await ConsultationSubscriptionServices.getAllExpiredConsultationSubscriptionsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All expired subscription payments are retrieved successfully.',
    data: result,
  });
});

export const ConsultationSubscriptionControllers = {
  createConsultationSubscriptionPaymentIntent,
  handleConsultationSubscriptionSuccessWebhook,
  getSingleConsultationSubscription,
  getAllActiveConsultationSubscriptions,
  getAllExpiredConsultationSubscriptions,
  getAllUsedConsultationSubscriptions,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RetirementNextStepServices } from './retirementNextStepPlan.service';

const createRetirementNextStepPlan = catchAsync(async (req, res) => {
  const result =
    await RetirementNextStepServices.createRetirementNextStepPlanIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement next step plan is created successfully.',
    data: result,
  });
});

const getAllRetirementNextStepPlans = catchAsync(async (req, res) => {
  const result =
    await RetirementNextStepServices.getAllRetirementNextStepPlansFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement next step plans are retrieved successfully.',
    data: result,
  });
});

export const RetirementNextStepControllers = {
  createRetirementNextStepPlan,
  getAllRetirementNextStepPlans,
};

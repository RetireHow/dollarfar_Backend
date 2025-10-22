import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RetirementNextStepServices } from './retirementNextStep.service';

const createRetirementNextStep = catchAsync(async (req, res) => {
  const result =
    await RetirementNextStepServices.createRetirementNextStepIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Next Step is created successfully.',
    data: result,
  });
});

const getRetirementNextSteps = catchAsync(async (req, res) => {
  const result =
    await RetirementNextStepServices.getRetirementNextStepsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Next Steps are retrieved successfully.',
    data: result,
  });
});

export const RetirementNextStepControllers = {
  createRetirementNextStep,
  getRetirementNextSteps,
};

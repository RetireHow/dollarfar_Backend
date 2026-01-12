import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RetirementPlanEmailServices } from './retirementPlanEmail.service';

const createRetirementPlanEmail = catchAsync(async (req, res) => {
  const result =
    await RetirementPlanEmailServices.createRetirementPlanEmailIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Eamil is created successfully.',
    data: result,
  });
});

const getRetirementPlanEmails = catchAsync(async (req, res) => {
  const planId = req.params.planId;
  const result =
    await RetirementPlanEmailServices.getRetirementPlanEmailsFromDB(planId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Eamils are retrieved successfully.',
    data: result,
  });
});

const removeRetirementPlanEmail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await RetirementPlanEmailServices.removeRetirementPlanEmailFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Eamil is removed successfully.',
    data: result,
  });
});

const sendCustomEmail = catchAsync(async (req, res) => {
  await RetirementPlanEmailServices.sendCustomEmailFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email is sent successfully.',
    data: null,
  });
});

export const RetirementPlanEmailControllers = {
  createRetirementPlanEmail,
  getRetirementPlanEmails,
  removeRetirementPlanEmail,
  sendCustomEmail,
};

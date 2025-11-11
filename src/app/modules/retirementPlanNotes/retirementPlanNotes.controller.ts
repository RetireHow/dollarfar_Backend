import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RetirementPlanNotesServices } from './retirementPlanNotes.service';

const createRetirementPlanNotes = catchAsync(async (req, res) => {
  const result =
    await RetirementPlanNotesServices.createRetirementPlanNotesIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Note is created successfully.',
    data: result,
  });
});

const getRetirementPlanNotes = catchAsync(async (req, res) => {
  const planId = req.params.planId;
  const result =
    await RetirementPlanNotesServices.getRetirementPlanNotesFromDB(planId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Notes are retrieved successfully.',
    data: result,
  });
});

const removeRetirementPlanNotes = catchAsync(async (req, res) => {
  const noteId = req.params.noteId;
  const result =
    await RetirementPlanNotesServices.removeRetirementPlanNotesFromDB(noteId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Note is removed successfully.',
    data: result,
  });
});

const updateRetirementPlanNotes = catchAsync(async (req, res) => {
  const result =
    await RetirementPlanNotesServices.updateRetirementPlanNotesIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retirement Plan Note is updated successfully.',
    data: result,
  });
});

export const RetirementPlanNotesControllers = {
  createRetirementPlanNotes,
  getRetirementPlanNotes,
  removeRetirementPlanNotes,
  updateRetirementPlanNotes,
};

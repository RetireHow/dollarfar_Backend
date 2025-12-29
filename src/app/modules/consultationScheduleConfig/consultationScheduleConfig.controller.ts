import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ConsultationScheduleConfigServices } from './consultationScheduleConfig.service';

const getAllConsultationSessionSlots = catchAsync(async (req, res) => {
  const { date } = req.params;
  const result =
    await ConsultationScheduleConfigServices.getAllConsultationSessionSlotsFromDB(
      date,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots are retrieved successfully.',
    data: result,
  });
});

const createConsultationScheduleConfig = catchAsync(async (req, res) => {
  const result =
    await ConsultationScheduleConfigServices.createConsultationScheduleConfigIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots are created successfully.',
    data: result,
  });
});

const updateConsultationScheduleConfig = catchAsync(async (req, res) => {
  const { configId } = req.params;
  const result =
    await ConsultationScheduleConfigServices.updateConsultationScheduleConfigIntoDB(
      configId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule config is updated successfully.',
    data: result,
  });
});

const getConsultationScheduleConfig = catchAsync(async (req, res) => {
  const result =
    await ConsultationScheduleConfigServices.getConsultationScheduleConfigFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule config is retrieved successfully.',
    data: result,
  });
});

export const ConsultationScheduleConfigControllers = {
  getAllConsultationSessionSlots,
  createConsultationScheduleConfig,
  updateConsultationScheduleConfig,
  getConsultationScheduleConfig,
};

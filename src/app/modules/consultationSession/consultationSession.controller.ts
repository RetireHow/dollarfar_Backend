import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ConsultationSessionServices } from './consultationSession.service';

const bookConsultationSession = catchAsync(async (req, res) => {
  const result =
    await ConsultationSessionServices.bookConsultationSessionIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Consultation session is booked successfully.',
    data: result,
  });
});

const getUserConsultationSessions = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result =
    await ConsultationSessionServices.getUserConsultationSessionsFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Consultation session is retrieved successfully.',
    data: result,
  });
});

const getAllConsultationSessions = catchAsync(async (req, res) => {
  const result =
    await ConsultationSessionServices.getAllConsultationSessionFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Consultation sessions are retrieved successfully.',
    data: result,
  });
});

export const ConsultationSessionControllers = {
  bookConsultationSession,
  getUserConsultationSessions,
  getAllConsultationSessions,
};

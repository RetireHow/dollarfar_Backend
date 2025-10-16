import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReportDownloadedUserServices } from './reportDownloadedUser.service';

const createReportDownloadedUser = catchAsync(async (req, res) => {

  const result =
    await ReportDownloadedUserServices.createReportDownloadedUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email is sent successfully.',
    data: result,
  });
});

const getReportDownloadedUsers = catchAsync(async (req, res) => {
  const result =
    await ReportDownloadedUserServices.getReportDownloadedUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report downloaded users are retrieved successfully.',
    data: result,
  });
});

const deleteReportDownloadedUser = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result =
    await ReportDownloadedUserServices.deleteReportDownloadedUserFromDB(
      email as string,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report downloaded user is deleted successfully.',
    data: result,
  });
});

export const ReportDownloadedUserControllers = {
  createReportDownloadedUser,
  getReportDownloadedUsers,
  deleteReportDownloadedUser,
};

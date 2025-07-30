import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EbookDownloadedUserServices } from './ebookDownloadedUser.service';

const createEbookDownloadedUser = catchAsync(async (req, res) => {
  const { fullName, email, mobile, city, ebookName } = req.body;
  const result =
    await EbookDownloadedUserServices.createEbookDownloadedUserIntoDB(
      fullName,
      email,
      mobile,
      city,
      ebookName,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email is sent successfully.',
    data: result,
  });
});

const getEbookDownloadedUsers = catchAsync(async (req, res) => {
  const result =
    await EbookDownloadedUserServices.getEbookDownloadedUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebook downloaded users are retrieved successfully.',
    data: result,
  });
});

export const EbookDownloadedUserControllers = {
  createEbookDownloadedUser,
  getEbookDownloadedUsers,
};

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ReportDownloadedUserModel } from './reportDownloadedUser.model';
import sendEmailWtihZeptoApi from '../../utils/zeptoApiEmailSending';

const createReportDownloadedUserIntoDB = async (
  name: string,
  email: string,
  phone: string,
  downloadedFileName: { downloadedFileName: string },
) => {
  if (!email) {
    throw new AppError(httpStatus.NOT_FOUND, 'Email is required!');
  }

  await ReportDownloadedUserModel.updateOne(
    { email },
    {
      $setOnInsert: { name, email, phone },
      $addToSet: { downloadedFiles: { downloadedFileName } },
    },
    { upsert: true },
  );

  const zeptoRes = await sendEmailWtihZeptoApi({
    email,
    name,
    // base64Pdf,
  });

  if (zeptoRes.error) {
    throw new AppError(httpStatus.NOT_FOUND, zeptoRes.error);
  }

  return {
    name,
    email,
    phone,
  };
};

const getReportDownloadedUsersFromDB = async () => {
  const usersData = await ReportDownloadedUserModel.find().sort({
    createdAt: 'desc',
  });
  return usersData;
};

export const ReportDownloadedUserServices = {
  createReportDownloadedUserIntoDB,
  getReportDownloadedUsersFromDB,
};

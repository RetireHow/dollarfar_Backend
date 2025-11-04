import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ReportDownloadedUserModel } from './reportDownloadedUser.model';

type TReportDownloadedUser = {
  name: string;
  email: string;
  phone: string;
  downloadedFileName: string;
};

const createReportDownloadedUserIntoDB = async (
  payload: TReportDownloadedUser,
) => {
  // const zeptoRes = await sendEmailWtihZeptoApi({
  //   email: payload.email,
  //   name: payload.name,
  //   // base64Pdf,
  // });

  // if (zeptoRes.error) {
  //   throw zeptoRes.error;
  // }

  await ReportDownloadedUserModel.create(payload);

  return {
    email: payload.email,
    name: payload.name,
    phone: payload.phone,
  };
};

const getReportDownloadedUsersFromDB = async () => {
  const usersData = await ReportDownloadedUserModel.find().sort({
    createdAt: 'desc',
  });
  return usersData;
};

const deleteReportDownloadedUserFromDB = async (userEmail: string) => {
  const usersData = await ReportDownloadedUserModel.findOneAndDelete({
    email: userEmail,
  });

  if (!usersData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found with the provided email address!',
    );
  }

  return usersData;
};

export const ReportDownloadedUserServices = {
  createReportDownloadedUserIntoDB,
  getReportDownloadedUsersFromDB,
  deleteReportDownloadedUserFromDB,
};

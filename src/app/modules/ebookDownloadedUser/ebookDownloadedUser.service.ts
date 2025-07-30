import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import sendEbookEmail from '../../utils/sendEbookEmail';
import { EbookDownloadedUserModel } from './ebookDownloadedUser.model';

const createEbookDownloadedUserIntoDB = async (
  fullName: string,
  email: string,
  mobile: string,
  city: string,
  ebookName: string,
) => {
  await EbookDownloadedUserModel.create({
    fullName,
    email,
    mobile,
    city,
    ebookName,
  });

  const zeptoRes = await sendEbookEmail({
    email,
    name: fullName,
  });

  if (zeptoRes.error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, zeptoRes.error);
  }

  return {
    fullName,
    email,
    mobile,
    city,
    ebookName,
  };
};

const getEbookDownloadedUsersFromDB = async () => {
  const usersData = await EbookDownloadedUserModel.find().sort({
    createdAt: 'desc',
  });
  return usersData;
};

export const EbookDownloadedUserServices = {
  createEbookDownloadedUserIntoDB,
  getEbookDownloadedUsersFromDB,
};

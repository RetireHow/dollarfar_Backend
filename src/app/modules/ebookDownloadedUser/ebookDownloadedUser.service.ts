import { sendTemplatedEmail } from '../../utils/sendTemplatedEmail';
import { EbookDownloadedUserModel } from './ebookDownloadedUser.model';

const createEbookDownloadedUserIntoDB = async (
  fullName: string,
  email: string,
  mobile: string,
  city: string,
  ebookName: string,
) => {
  const zeptoRes = await sendTemplatedEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.78f648a0-3544-11f0-a9b9-1ad0b05a72f3.196ec668a2a',
    to: [{ address: email, name: fullName }],
    mergeInfo: {
      name: fullName,
    },
  });

  if (zeptoRes.error) {
    throw zeptoRes.error;
  }

  await EbookDownloadedUserModel.create({
    fullName,
    email,
    mobile,
    city,
    ebookName,
  });

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

import config from '../../config';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';
import { EbookDownloadedUserModel } from './ebookDownloadedUser.model';

const createEbookDownloadedUserIntoDB = async (
  fullName: string,
  email: string,
  mobile: string,
  city: string,
  ebookName: string,
) => {
  const zeptoRes = await sendZeptoEmail({
    templateKey: config.zepto_email_template_key_ebook as string,
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

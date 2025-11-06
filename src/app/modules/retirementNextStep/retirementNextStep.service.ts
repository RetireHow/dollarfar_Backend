import { RetirementNextStepModel } from './retirementNextStep.model';
import { TRetirementNextStep } from './retirementNextStep.interface';

import { SendMailClient } from 'zeptomail';
import config from '../../config';
const sendRetirementSubmissionNotificationEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  region: string;
}) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const zeptoData = {
      template_key:
        config.zepto_email_template_key_retirement_plan_submission_notification,

      from: {
        address: 'info@dollarfar.com',
        name: 'Dollarfar',
      },
      to: [
        {
          email_address: {
            address: 'billalhossain.webdev@gmail.com',
            name: 'Billal Hossain',
          },
        },
      ],
      merge_info: data,
    };

    const response = await zeptoMailClient.sendMailWithTemplate(zeptoData);
    return response;
  } catch (error) {
    return error;
  }
};

const createRetirementNextStepIntoDB = async (payload: TRetirementNextStep) => {
  const zeptoRes = await sendRetirementSubmissionNotificationEmail({
    name: payload.full_name,
    email: payload.email,
    phone: payload.phone,
    region: payload.region,
  });

  if (zeptoRes.error) {
    throw zeptoRes.error;
  }
  const res = RetirementNextStepModel.create(payload);
  return res;
};

const getRetirementNextStepsFromDB = async () => {
  const res = RetirementNextStepModel.find({}).sort({ _id: -1 });
  return res;
};

export const RetirementNextStepServices = {
  createRetirementNextStepIntoDB,
  getRetirementNextStepsFromDB,
};

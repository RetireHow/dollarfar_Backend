import { RetirementNextStepModel } from './retirementNextStep.model';
import { TRetirementNextStep } from './retirementNextStep.interface';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';
import config from '../../config';

const createRetirementNextStepIntoDB = async (payload: TRetirementNextStep) => {
  const zeptoRes = await sendZeptoEmail({
    templateKey:
      config.zepto_email_template_key_retirement_plan_submission_notification as string,
    to: [{ address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' }],
    mergeInfo: {
      name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      region: payload.region,
    },
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

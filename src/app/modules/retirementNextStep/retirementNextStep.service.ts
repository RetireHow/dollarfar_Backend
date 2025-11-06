import { RetirementNextStepModel } from './retirementNextStep.model';
import { TRetirementNextStep } from './retirementNextStep.interface';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';

const createRetirementNextStepIntoDB = async (payload: TRetirementNextStep) => {
  const zeptoRes = await sendZeptoEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ea908f10-bad8-11f0-9a59-1ad0b05a72f3.19a57d45a81',
    to: [{ address: 'rao.movva@retirehow.com', name: 'Rao Movva' }],
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

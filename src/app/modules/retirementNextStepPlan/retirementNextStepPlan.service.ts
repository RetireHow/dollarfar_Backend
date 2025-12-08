import { RetirementNextStepModel } from './retirementNextStepPlan.model';
import { TRetirementNextStep } from './retirementNextStepPlan.interface';
import { sendTemplatedEmail } from '../../utils/sendTemplatedEmail';

const createRetirementNextStepPlanIntoDB = async (
  payload: TRetirementNextStep,
) => {
  const zeptoRes = await sendTemplatedEmail({
    templateKey:
      '3b2f8.24630c2170da85ea.k1.ea908f10-bad8-11f0-9a59-1ad0b05a72f3.19a57d45a81',
    // to: [{ address: 'rao.movva@retirehow.com', name: 'Rao Movva' }],
    to: [{ address: 'billalhossain.webdev@gmail.com', name: 'Billal Hossain' }],
    mergeInfo: {
      name: payload.contact.name,
      email: payload.contact.email,
      phone: payload.contact.phone,
      region: payload.contact.region,
    },
  });

  if (zeptoRes.error) {
    throw zeptoRes.error;
  }
  const res = await RetirementNextStepModel.create(payload);
  return res;
};

const getAllRetirementNextStepPlansFromDB = async () => {
  const res = await RetirementNextStepModel.find({}).sort({ _id: -1 });
  return res;
};

const getSingleRetirementNextStepPlanFromDB = async (planId: string) => {
  const res = await RetirementNextStepModel.findById(planId);
  return res;
};

export const RetirementNextStepServices = {
  createRetirementNextStepPlanIntoDB,
  getAllRetirementNextStepPlansFromDB,
  getSingleRetirementNextStepPlanFromDB,
};

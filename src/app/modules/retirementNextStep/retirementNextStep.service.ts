import { RetirementNextStepModel } from './retirementNextStep.model';
import { TRetirementNextStep } from './retirementNextStep.interface';

const createRetirementNextStepIntoDB = async (payload: TRetirementNextStep) => {
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

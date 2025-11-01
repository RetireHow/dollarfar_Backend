import { RetirementPlanNotesModel } from './retirementPlanNotes.model';
import { TRetirementPlanNotes } from './retirementPlanNotes.interface';

const createRetirementPlanNotesIntoDB = async (
  payload: TRetirementPlanNotes,
) => {
  const res = RetirementPlanNotesModel.create(payload);
  return res;
};

const getRetirementPlanNotesFromDB = async (planId: string) => {
  const res = RetirementPlanNotesModel.find({ retirementPlan: planId })
    .populate('retirementPlan')
    .sort({ _id: -1 });
  return res;
};

export const RetirementPlanNotesServices = {
  createRetirementPlanNotesIntoDB,
  getRetirementPlanNotesFromDB,
};

import { RetirementPlanNotesModel } from './retirementPlanNotes.model';
import { TRetirementPlanNotes } from './retirementPlanNotes.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createRetirementPlanNotesIntoDB = async (
  payload: TRetirementPlanNotes,
) => {
  const res = RetirementPlanNotesModel.create(payload);
  return res;
};

const getRetirementPlanNotesFromDB = async (planId: string) => {
  const res = RetirementPlanNotesModel.find({ retirementPlan: planId })
    // .populate('retirementPlan')
    .sort({ _id: -1 });
  return res;
};

const removeRetirementPlanNotesFromDB = async (noteId: string) => {
  //   Check if note exist
  const note = await RetirementPlanNotesModel.findById(noteId);
  if (!note) {
    throw new AppError(httpStatus.NOT_FOUND, 'Note not found!');
  }

  const res = await RetirementPlanNotesModel.findByIdAndDelete({ _id: noteId });
  return res;
};

const updateRetirementPlanNotesIntoDB = async (payload: {
  noteId: string;
  content: string;
}) => {
  //   Check if note exist
  const note = await RetirementPlanNotesModel.findById(payload.noteId);
  if (!note) {
    throw new AppError(httpStatus.NOT_FOUND, 'Note not found!');
  }
  const res = RetirementPlanNotesModel.findByIdAndUpdate(
    payload.noteId,
    { content: payload.content },
    { new: true, runValidators: true },
  );
  return res;
};

export const RetirementPlanNotesServices = {
  createRetirementPlanNotesIntoDB,
  getRetirementPlanNotesFromDB,
  removeRetirementPlanNotesFromDB,
  updateRetirementPlanNotesIntoDB,
};

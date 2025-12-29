import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TRetirementPlanEmail } from './retirementPlanEmail.interface';
import { RetirementPlanEmail } from './retirementPlanEmail.model';
import { sendUserEmail } from '../../utils/sendUserEmail';
import { RetirementNextStepModel } from '../retirementNextStepPlan/retirementNextStepPlan.model';
import { TRetirementNextStep } from '../retirementNextStepPlan/retirementNextStepPlan.interface';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';

const createRetirementPlanEmailIntoDB = async (
  payload: TRetirementPlanEmail,
) => {
  // check if user found
  const user = (await User.findById(payload.userId)) as TUser;
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if plan found
  const plan = (await RetirementNextStepModel.findById(
    payload.planId,
  )) as TRetirementNextStep;
  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found!');
  }

  // Send email to user
  const userZeptoRes = await sendUserEmail({
    to: [{ address: plan.contact.email, name: plan.contact.name }],
    subject: payload.subject,
    body: payload.body,
  });
  if (userZeptoRes.error) {
    throw userZeptoRes.error;
  }
  const res = await RetirementPlanEmail.create(payload);
  return res;
};

const getRetirementPlanEmailsFromDB = async (planId: string) => {
  const res = await RetirementPlanEmail.find({ planId });
  return res;
};

const removeRetirementPlanEmailFromDB = async (id: string) => {
  //   Check if email found
  const email = await RetirementPlanEmail.findById(id);
  if (!email) {
    throw new AppError(httpStatus.NOT_FOUND, 'Email not found!');
  }

  const res = await RetirementPlanEmail.findByIdAndDelete({ _id: id });
  return res;
};

export const RetirementPlanEmailServices = {
  createRetirementPlanEmailIntoDB,
  getRetirementPlanEmailsFromDB,
  removeRetirementPlanEmailFromDB,
};

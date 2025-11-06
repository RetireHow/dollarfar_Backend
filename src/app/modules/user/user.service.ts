/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { AdminModel } from '../admin/admin.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, payload: TUser) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set moderator role
  userData.role = 'moderator';

  //set moderator email
  userData.email = payload.email;

  // create a user
  const newUser = await User.create(userData);
  return newUser;
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'Admin') {
    result = await AdminModel.findOne({ id: userId });
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getMe,
  changeStatus,
};

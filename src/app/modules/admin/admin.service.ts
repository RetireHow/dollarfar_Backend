import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AdminModel } from '../admin/admin.model';
import bcrypt from 'bcrypt';

const createAdminIntoDB = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingAdmin = await AdminModel.findOne({ email });
  if (existingAdmin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This admin already exist!');
  }
  // hash password
  const hashedPwd = await bcrypt.hash(password, 12);

  const adminData = await AdminModel.create({
    name,
    email,
    password: hashedPwd,
  });

  return {
    name: adminData.name,
    email: adminData.email,
  };
};

const loginAdminIntoDB = async (email: string, password: string) => {
  const existingAdmin = await AdminModel.findOne({ email });
  //   Check if user exist
  if (!existingAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
  }

  const matched = await bcrypt.compare(
    password as string,
    existingAdmin?.password,
  );

  //check if password match
  if (!matched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password does not match!');
  }

  return {
    name: existingAdmin?.name,
    email: existingAdmin?.email,
  };
};

const getAdminDetailsFromDB = async (email: string) => {
  const existingAdmin = await AdminModel.findOne({ email });
  //   Check if user exist
  if (!existingAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found!');
  }
  return {
    name: existingAdmin?.name,
    email: existingAdmin?.email,
  };
};

export const AdminServices = {
  createAdminIntoDB,
  loginAdminIntoDB,
  getAdminDetailsFromDB,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const createAdmin = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await AdminServices.createAdminIntoDB(name, email, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully.',
    data: result,
  });
});

const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AdminServices.loginAdminIntoDB(email, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is logged in successfully.',
    data: result,
  });
});

const getAdminDetails = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result = await AdminServices.getAdminDetailsFromDB(email as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin details is retrieved successfully.',
    data: result,
  });
});

export const AdminControllers = {
  createAdmin,
  loginAdmin,
  getAdminDetails,
};

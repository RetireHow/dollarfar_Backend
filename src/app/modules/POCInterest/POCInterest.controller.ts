import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { POCInterestServices } from './POCInterest.service';

const createPOCInterest = catchAsync(async (req, res) => {
  const result = await POCInterestServices.createPOCInterestIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'POC interest is created successfully.',
    data: result,
  });
});

const getAllPOCInterests = catchAsync(async (req, res) => {
  const result = await POCInterestServices.getAllPOCInterestsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'POC interests are retrieved successfully.',
    data: result,
  });
});

const getSinglePOCInterest = catchAsync(async (req, res) => {
  const {pocId} = req.params;
  const result = await POCInterestServices.getSinglePOCInterestFromDB(pocId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'POC interest is retrieved successfully.',
    data: result,
  });
});

export const POCInterestControllers = {
  createPOCInterest,
  getAllPOCInterests,
  getSinglePOCInterest
};

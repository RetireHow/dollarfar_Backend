import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  CityCostEstimatorQueryParams,
  CityPricesQueryParams,
  NumbeoServices,
} from './numbeo.service';


const getAllCities = catchAsync(async (req, res) => {
  const { term } = req.query;
  const result = await NumbeoServices.getAllCitiesFromDB(term as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cities are retrieved successfully',
    data: result,
  });
});

const getCityPrices = catchAsync(async (req, res) => {
  const { city, country, currency } = req.query;
  const result = await NumbeoServices.getCityPricesFromDB({
    city,
    country,
    currency,
  } as CityPricesQueryParams);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City prices are retrieved successfully',
    data: result,
  });
});


const getExchangeRates = catchAsync(async (req, res) => {
  const result = await NumbeoServices.getExchangeRatesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exchange rates are retrieved successfully',
    data: result,
  });
});

const getCityCostEstimator = catchAsync(async (req, res) => {
  const { country, city, members, children, isRent, currency } = req.query;
  const result = await NumbeoServices.getCityCostEstimatorFromDB({
    city,
    country,
    currency,
    members,
    children,
    isRent,
  } as CityCostEstimatorQueryParams);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City cost estimators are retrieved successfully',
    data: result,
  });
});

const getCloseCitiesWithPrice = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCloseCitiesWithPriceFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Close cities with price are retrieved successfully',
    data: result,
  });
});

const getCityIndices = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCityIndicesFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City indices are retrieved successfully',
    data: result,
  });
});

const getCityCrime = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCityCrimeFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City crimes are retrieved successfully',
    data: result,
  });
});

const getCityHealthCare = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCityHealthCareFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City healthcares are retrieved successfully',
    data: result,
  });
});

const getCityPollution = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCityPollutionFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City pollutions are retrieved successfully',
    data: result,
  });
});

const getCityTraffic = catchAsync(async (req, res) => {
  const { country, city } = req.query;
  const result = await NumbeoServices.getCityTrafficFromDB({
    city,
    country,
  } as { city: string; country: string });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'City traffics are retrieved successfully',
    data: result,
  });
});

export const NumbeoControllers = {
  getAllCities,
  getCityPrices,
  getExchangeRates,
  getCityCostEstimator,
  getCloseCitiesWithPrice,
  getCityIndices,
  getCityCrime,
  getCityHealthCare,
  getCityPollution,
  getCityTraffic
};

import axios from 'axios';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';

export interface CityPricesQueryParams {
  city: string;
  country: string;
  currency: string;
}

export interface CityCostEstimatorQueryParams {
  country: string;
  city: string;
  members: string;
  children: string;
  isRent: string;
  currency: string;
}

const getAllCitiesFromDB = async (term: string) => {
  if (!term) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Search term is required in the query param.',
    );
  }
  const result = await axios.get(
    `https://www.numbeo.com/common/CitySearchJson?term=${term}`,
  );
  return result?.data;
};

const getCityPricesFromDB = async (query: CityPricesQueryParams) => {
  const { city, country, currency } = query;

  const result = await axios.get(
    `https://www.numbeo.com/api/city_prices?api_key=${config.numbeo_api_key}&query=${city},${country}&currency=${currency}`,
  );
  return result?.data;
};

const getCityPricesByCityFromDB = async (query: CityPricesQueryParams) => {
  const { city, currency } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_prices?api_key=${config.numbeo_api_key}&query=${city}&currency=${currency}`,
  );
  return result?.data;
};

const getExchangeRatesFromDB = async () => {
  const result = await axios.get(
    `https://www.numbeo.com/api/currency_exchange_rates?api_key=${config.numbeo_api_key}`,
  );
  return result?.data;
};

const getCityCostEstimatorFromDB = async (
  query: CityCostEstimatorQueryParams,
) => {
  const { country, city, members, children, isRent, currency } = query;

  const result = await axios.get(
    `https://www.numbeo.com/api/city_cost_estimator?api_key=${config.numbeo_api_key}&query=${city},${country}&household_members=${members}&children=${children}&include_rent=${isRent}&currency=${currency}`,
  );
  return result?.data;
};

const getCloseCitiesWithPriceFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/close_cities_with_prices?api_key=${config.numbeo_api_key}&query=${city},${country}&min_contributors=2&max_distance=10000`,
  );
  return result?.data;
};

const getCityIndicesFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/indices?api_key=${config.numbeo_api_key}&query=${city},${country}`,
  );
  return result?.data;
};

const getCityCrimeFromDB = async (query: { country: string; city: string }) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_crime?api_key=${config.numbeo_api_key}&query=${city},${country}`,
  );
  return result?.data;
};

const getCityHealthCareFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_healthcare?api_key=${config.numbeo_api_key}&query=${city},${country}`,
  );
  return result?.data;
};

const getCityPollutionFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_pollution?api_key=${config.numbeo_api_key}&query=${city},${country}`,
  );
  return result?.data;
};

const getCityTrafficFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { country, city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_traffic?api_key=${config.numbeo_api_key}&query=${city},${country}`,
  );
  return result?.data;
};

export const NumbeoServices = {
  getAllCitiesFromDB,
  getCityPricesFromDB,
  getCityPricesByCityFromDB,
  getExchangeRatesFromDB,
  getCityCostEstimatorFromDB,
  getCloseCitiesWithPriceFromDB,
  getCityIndicesFromDB,
  getCityCrimeFromDB,
  getCityHealthCareFromDB,
  getCityPollutionFromDB,
  getCityTrafficFromDB,
};

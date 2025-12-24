import axios from 'axios';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import {
  CityCostEstimatorQueryParams,
  CityPricesQueryParams,
  TRecentComparison,
} from './numbeo.interface';
import { RecentComparison } from './numbeo.model';
import { calculateDifference, getCityIndices } from './numbe.utils';

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
  const { city, members, children, isRent, currency } = query;

  const result = await axios.get(
    `https://www.numbeo.com/api/city_cost_estimator?api_key=${config.numbeo_api_key}&query=${city}&household_members=${members}&children=${children}&include_rent=${isRent}&currency=${currency}`,
  );
  return result?.data;
};

const getCloseCitiesWithPriceFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/close_cities_with_prices?api_key=${config.numbeo_api_key}&query=${city}&min_contributors=2&max_distance=10000`,
  );
  return result?.data;
};

const getCityIndicesFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/indices?api_key=${config.numbeo_api_key}&query=${city}`,
  );
  return result?.data;
};

const getCityCrimeFromDB = async (query: { country: string; city: string }) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_crime?api_key=${config.numbeo_api_key}&query=${city}`,
  );
  return result?.data;
};

const getCityHealthCareFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_healthcare?api_key=${config.numbeo_api_key}&query=${city}`,
  );
  return result?.data;
};

const getCityPollutionFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_pollution?api_key=${config.numbeo_api_key}&query=${city}`,
  );
  return result?.data;
};

const getCityTrafficFromDB = async (query: {
  country: string;
  city: string;
}) => {
  const { city } = query;
  const result = await axios.get(
    `https://www.numbeo.com/api/city_traffic?api_key=${config.numbeo_api_key}&query=${city}`,
  );
  return result?.data;
};

const logRecentComparisonIntoDB = async (payload: TRecentComparison) => {
  const { cityA, cityB } = payload;

  // before insert
  const exists = await RecentComparison.findOne({
    cityA,
    cityB,
    createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
  });

  if (exists) return null;

  const res = await RecentComparison.create(payload);
  return res;
};

const getRecentComparisonsFromDB = async () => {
  const comparisons = await RecentComparison.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // 1. Collect unique cities
  const uniqueCities = new Set<string>();
  comparisons.forEach(c => {
    uniqueCities.add(c.cityA);
    uniqueCities.add(c.cityB);
  });

  // 2. Fetch indices once per city
  const cityIndexMap = new Map<string, number>();

  await Promise.all(
    Array.from(uniqueCities).map(async city => {
      const data = await getCityIndices(city);
      cityIndexMap.set(city, data.cost_of_living_plus_rent_index);
    }),
  );

  // 3. Enrich comparisons (NO HTML)
  const enriched = comparisons.map(item => {
    const indexA = cityIndexMap.get(item.cityA)!;
    const indexB = cityIndexMap.get(item.cityB)!;

    const diff = calculateDifference(indexA, indexB);
    const absDiff = Number(Math.abs(diff).toFixed(2));

    return {
      ...item,
      percentage: absDiff,
      relation: diff > 0 ? 'more expensive' : 'cheaper',
      reference: 'cityB', // optional but explicit
    };
  });

  return enriched;
};

export const NumbeoServices = {
  getAllCitiesFromDB,
  getCityPricesFromDB,
  getExchangeRatesFromDB,
  getCityCostEstimatorFromDB,
  getCloseCitiesWithPriceFromDB,
  getCityIndicesFromDB,
  getCityCrimeFromDB,
  getCityHealthCareFromDB,
  getCityPollutionFromDB,
  getCityTrafficFromDB,
  logRecentComparisonIntoDB,
  getRecentComparisonsFromDB,
};

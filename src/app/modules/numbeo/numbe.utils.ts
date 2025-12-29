import axios from 'axios';
import config from '../../config';
import { NumbeoIndicesResponse } from './numbeo.interface';

export const getCityIndices = async (
  city: string,
): Promise<NumbeoIndicesResponse> => {
  const result = await axios.get('https://www.numbeo.com/api/indices', {
    params: {
      api_key: config.numbeo_api_key,
      query: city,
    },
  });

  return result.data;
};

export const calculateDifference = (indexA: number, indexB: number): number => {
  return ((indexB - indexA) / indexA) * 100;
};

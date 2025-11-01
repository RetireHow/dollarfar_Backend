/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import yahooFinance from 'yahoo-finance2';
import config from '../../config';

const getFredInflation = async () => {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCSL&api_key=${config.fred_api_key}&file_type=json`;
  const { data } = await axios.get(url);
  return data.observations.map((o: any) => ({
    date: o.date,
    value: parseFloat(o.value),
  }));
};

const getYahooIndexData = async (symbol: string) => {
  const queryOptions = { period1: '1990-01-01', interval: '1mo' };
  const result = await (yahooFinance.historical as any)(symbol, queryOptions);

  return result.map((d: any) => ({
    date: d.date.toISOString().split('T')[0],
    close: d.close,
  }));
};

export const AndexServices = {
  getFredInflation,
  getYahooIndexData,
};

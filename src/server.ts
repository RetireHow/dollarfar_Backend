import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { calculateLivingCosts } from './utils/calculateLivingCost';
import config from './config';
import { TCity, TExchangeRates, TPriceItem } from './types';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://resources.dollarfar.com'],
    credentials: true,
  }),
);

// Application Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Dollarfar API.',
  });
});

app.get('/api/city-prices', async (req, res) => {
  try {
    const { city1, country1, city2, country2 } = req.query;

    if (!city1 || !country1 || !city2 || !country2) {
      return res.json({
        message: 'Required params missing.',
        success: false,
        statusCode: 400,
      });
    }

    const priceRes1: { data: TCity } = await axios.get(
      `https://www.numbeo.com/api/city_prices?api_key=${config.api_key}&city=${city1}&country=${country1}`,
    );

    if (priceRes1?.data?.prices?.length == 0) {
      return res.json({
        message: `No information available for ${priceRes1?.data?.name}`,
        success: false,
        statusCode: 400,
      });
    }

    const priceRes2: { data: TCity } = await axios.get(
      `https://www.numbeo.com/api/city_prices?api_key=${config.api_key}&city=${city2}&country=${country2}`,
    );

    if (priceRes2?.data?.prices?.length == 0) {
      return res.json({
        message: `No information available for ${priceRes2?.data?.name}`,
        success: false,
        statusCode: 400,
      });
    }

    const exchangeRatesResponse: { data: { exchange_rates: TExchangeRates } } =
      await axios.get(
        `https://www.numbeo.com/api/currency_exchange_rates?api_key=${config.api_key}`,
      );
    const priceItemsResponse: { data: TPriceItem } = await axios.get(
      `https://www.numbeo.com/api/price_items?api_key=${config.api_key}`,
    );

    const modifiedCostData = calculateLivingCosts(
      priceRes1?.data,
      priceRes2?.data,
      priceItemsResponse?.data,
      exchangeRatesResponse?.data?.exchange_rates,
    );
    res.json({
      message: 'Retrieved cost of living data',
      success: true,
      statusCode: 200,
      data: modifiedCostData,
    });
  } catch (error) {
    res.json({
      message: 'Failed to Fetch City Prices.',
      success: false,
      statusCode: 400,
    });
  }
});

app.listen(config.port, () =>
  console.log(`Dollarfar API running on port ${config.port}`),
);

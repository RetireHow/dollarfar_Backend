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
    origin: ['http://localhost:5174', 'https://resources.dollarfar.com'],
    credentials: true,
  }),
);

// Application Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Dollarfar resources API.',
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

app.get('/api/single-city-prices', async (req, res) => {
  try {
    const { country, city, currency } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_prices?api_key=${config.api_key}&query=${city},${country}&currency=${currency}`,
    );
    return res.json({
      message: 'Retrieved currency exchange rates',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/currency-exchange-rates', async (req, res) => {
  try {
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/currency_exchange_rates?api_key=${config.api_key}`,
    );
    return res.json({
      message: 'Retrieved currency exchange rates',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-cost-estimator', async (req, res) => {
  try {
    const { country, city, members, children, isRent, currency } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_cost_estimator?api_key=${config.api_key}&query=${city},${country}&household_members=${members}&children=${children}&include_rent=${isRent}&currency=${currency}`,
    );
    return res.json({
      message: 'Retrieved city cost estimator',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/close-cities-with-prices', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/close_cities_with_prices?api_key=${config.api_key}&query=${city},${country}&min_contributors=2&max_distance=10000`,
    );
    return res.json({
      message: 'Retrieved close cities',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-indices', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/indices?api_key=${config.api_key}&query=${city},${country}`,
    );
    return res.json({
      message: 'Retrieved city indices',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-crime', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_crime?api_key=${config.api_key}&query=${city},${country}`,
    );
    return res.json({
      message: 'Retrieved city crime data',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-healthcare', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_healthcare?api_key=${config.api_key}&query=${city},${country}`,
    );
    return res.json({
      message: 'Retrieved city healthcare data',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-pollution', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_pollution?api_key=${config.api_key}&query=${city},${country}`,
    );
    return res.json({
      message: 'Retrieved city pollution data',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/city-traffic', async (req, res) => {
  try {
    const { country, city } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_traffic?api_key=${config.api_key}&query=${city},${country}`,
    );
    return res.json({
      message: 'Retrieved city pollution data',
      success: true,
      statusCode: 200,
      data: apiResponse?.data,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.listen(config.port, () =>
  console.log(`Dollarfar API running on port ${config.port}`),
);

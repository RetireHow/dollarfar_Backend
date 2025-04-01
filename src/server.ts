import express from 'express';
import cors from 'cors';
import axios from 'axios';
import config from './config';
import { sendEmail } from './utils/sendEmail';

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

app.get('/api/single-city-prices', async (req, res) => {
  try {
    const { country, city, currency } = req.query;
    const apiResponse = await axios.get(
      `https://www.numbeo.com/api/city_prices?api_key=${config.api_key}&query=${city},${country}&currency=${currency}`,
    );
    return res.json({
      message: 'Retrieved city prices',
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

const htmlMessage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download Confirmation - DollarFar</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #3498db;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 20px;
      color: #333;
    }
    .email-body h2 {
      color: #333;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .email-footer {
      background-color: #f4f4f4;
      padding: 10px;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-body">
      <h2>Hello {{user_name}},</h2>
      <p>We're glad to have you as a user of DollarFar!</p>

      <p>Your download has been successfully completed.</p>

      <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@dollarfar.com">support@dollarfar.com</a>.</p>

      <p>Thank you for using DollarFar!</p>
    </div>
    <div class="email-footer">
      <p>Best regards,<br>The DollarFar Team</p>
    </div>
  </div>
</body>
</html>`;

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone } = req.body || {};
    // Store into DB
    const apiResponse = await axios.post(
      'https://sheetdb.io/api/v1/bkktvh0ar9ut8',
      {
        data: [
          {
            id: 'INCREMENT',
            name,
            email,
            phone,
          },
        ],
      },
    );

    if (apiResponse?.status !== 201 && apiResponse?.statusText !== 'Created') {
      return res.json({
        message: 'Failed to store user info into DB!',
        success: false,
        statusCode: 400,
      });
    }

    if (!email) {
      return res.json({
        message: 'Please provide a valid email address!',
        success: false,
        statusCode: 400,
      });
    }
    await sendEmail(email, htmlMessage);
    res.json({
      message: 'Sent email successfully.',
      success: true,
      statusCode: 200,
      data: req.body,
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

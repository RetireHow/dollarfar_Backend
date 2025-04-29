import express from 'express';
import cors from 'cors';
import axios from 'axios';
import config from './config';
import sendEmailWtihZeptoApi from './utils/zeptoApiEmailSending';
import mongoose, { model, Schema } from 'mongoose';

// import path from 'path';
// import fs from 'fs';

// import { generatePDF, getBase64 } from './utils/generatePDF';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5174', 'https://resources.dollarfar.com'],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    downloadedFiles: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

const UserModel = model('User', userSchema);

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const AdminModel = model('Admin', adminSchema);

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

// Send Email
app.post('/api/send-email-by-zeptoapi', async (req, res) => {
  try {
    const { name, email, phone, downloadedFileName } = req.body || {};

    if (!email) {
      return res.json({
        message: 'Please provide a valid email address!',
        success: false,
        statusCode: 400,
      });
    }

    // Generate PDF File
    // const filePath = path.join(__dirname, 'output.pdf');
    // const userData = {
    //   name: 'John Doe',
    //   orderId: '123456',
    //   amount: '49.99',
    // };
    // await generatePDF(filePath, userData);
    // const base64Pdf = getBase64(filePath);
    //  // Optional: delete the file
    //  fs.unlinkSync(filePath);

    await UserModel.updateOne(
      { email },
      {
        $setOnInsert: { name, email, phone },
        $addToSet: { downloadedFiles: downloadedFileName },
      },
      { upsert: true },
    );

    const zeptoRes = await sendEmailWtihZeptoApi({
      email,
      name,
      // base64Pdf,
    });

    if (zeptoRes.error) {
      throw zeptoRes.error;
    }

    return res.json({
      message: 'Sent email successfully.',
      success: true,
      statusCode: 200,
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
      error: error,
    });
  }
});

app.get('/api/pdf-downloaded-users', async (req, res) => {
  try {
    const usersData = await UserModel.find();
    return res.json({
      message: 'Retrieved users data',
      success: true,
      statusCode: 200,
      data: usersData,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.post('/api/create-admin', async (req, res) => {
  try {
    const adminData = await AdminModel.create(req?.body);
    return res.json({
      message: 'Created a new admin successfully',
      success: true,
      statusCode: 200,
      data: adminData,
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
      error,
    });
  }
});

app.get('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await AdminModel.findOne({ email, password });
    if (!adminData) {
      return res.json({
        message: 'You are not authorized',
        success: false,
        statusCode: 400,
      });
    }
    return res.json({
      message: 'Retrieved admin data',
      success: true,
      statusCode: 200,
      data: {
        name: adminData?.name,
        email: adminData?.email,
      },
    });
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.get('/api/cities', async (req, res) => {
  try {
    const { term } = req.query;
    console.log('Term=======> ', term);
    if (term) {
      const apiResponse = await axios.get(
        `https://www.numbeo.com/common/CitySearchJson?term=${term}`,
      );
      return res.json({
        message: 'Retrieved cities data',
        success: true,
        statusCode: 200,
        data: apiResponse?.data,
      });
    }
  } catch (error) {
    res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);
    app.listen(config.port, () => {
      console.log(`server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

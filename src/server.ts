import express from 'express';
import cors from 'cors';
import axios from 'axios';
import config from './config';
import sendEmailWtihZeptoApi from './utils/zeptoApiEmailSending';
import mongoose, { model, Schema } from 'mongoose';
import sendOTPMail from './utils/sendOTPMail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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

const downloadedFileSchema = new Schema(
  {
    downloadedFileName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, _id: false }, // Disable _id if you don't need it for each file
);

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
      type: [downloadedFileSchema],
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

// ========================================== || OTP || =========================================
const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const OTPModel = mongoose.model('Otp', otpSchema);

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
        $addToSet: { downloadedFiles: { downloadedFileName } },
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
    const { name, email, password } = req.body;

    const existingAdmin = await AdminModel.findOne({ email });

    //Check if admin already exist
    if (existingAdmin) {
      return res.json({
        message: 'This user already exist!',
        success: false,
        statusCode: 400,
      });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 12);

    const adminData = await AdminModel.create({
      name,
      email,
      password: hashedPwd,
    });

    return res.json({
      message: 'Created a new admin successfully',
      success: true,
      statusCode: 200,
      data: {
        name: adminData.name,
        email: adminData.email,
      },
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
    const { email, password } = req.query;
    const adminData = await AdminModel.findOne({ email });

    //Check if user exists
    if (!adminData) {
      return res.json({
        message: 'Admin not found!',
        success: false,
        statusCode: 400,
      });
    }

    const matched = await bcrypt.compare(
      password as string,
      adminData?.password,
    );

    //check if password match
    if (!matched) {
      return res.json({
        message: 'Password does not match!',
        success: false,
        statusCode: 400,
      });
    }

    return res.json({
      message: 'Logged in successfully',
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

//OTP Routes
app.post('/api/send-and-store-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await AdminModel.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: 'User not found!',
        success: false,
        statusCode: 404,
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    const createdOTP = await OTPModel.findOneAndUpdate(
      { email },
      { email, otp, isVerified: false },
      { upsert: true, new: true },
    );

    await sendOTPMail({
      name: existingUser.name,
      email: existingUser.email,
      otp,
    });
    return res.json({
      message: 'An OTP code is sent!',
      success: true,
      statusCode: 200,
      data: createdOTP,
    });
  } catch (error) {
    return res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
      error,
    });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const existingUser = await AdminModel.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: 'User not found!',
        success: false,
        statusCode: 404,
      });
    }

    const otpRecord = await OTPModel.findOne({ email, otp });

    if (!otpRecord) {
      return res.json({
        message: 'Invalid OTP!',
        success: false,
        statusCode: 400,
      });
    }

    const updatedOtp = await OTPModel.findByIdAndUpdate(
      { _id: otpRecord._id },
      { isVerified: true },
      { new: true },
    ); // Delete OTP after successful verification
    return res.json({
      message: 'OTP verified successfully!',
      success: true,
      statusCode: 200,
      data: updatedOtp,
    });
  } catch (error) {
    return res.json({
      message: 'There is something went wrong!',
      success: false,
      statusCode: 400,
    });
  }
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const existingUser = await AdminModel.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: 'User not found!',
        success: false,
        statusCode: 404,
      });
    }

    const otpRecord = await OTPModel.findOne({ email, otp, isVerified: true });

    if (!otpRecord) {
      return res.json({
        message: 'Invalid OTP!',
        success: false,
        statusCode: 400,
      });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(newPassword, 12);
    await AdminModel.findByIdAndUpdate(
      { _id: existingUser?._id },
      { password: hashedPwd },
    );

    await OTPModel.deleteOne({ _id: otpRecord._id }); // Delete OTP after successful verification

    return res.json({
      message: 'Password reset successfully!',
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return res.json({
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

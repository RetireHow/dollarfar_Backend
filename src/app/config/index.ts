import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  mongodb_url: process.env.DATABASE_URL,
  fred_api_key: process.env.FRED_API_KEY,

  default_password: process.env.DEFAULT_PASS,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  numbeo_api_key: process.env.NUMBEO_API_KEY,

  // Stripe
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_secret_key_test: process.env.STRIPE_SECRET_KEY_TEST,

  // Zepto Mail
  zepto_smpt_user: process.env.ZEPTO_SMTP_USER,
  zepto_smpt_pass: process.env.ZEPTO_SMTP_PASS,
  zepto_api_token: process.env.ZEPTO_API_TOKEN,
  zepto_api_url: process.env.ZEPTO_API_URL,

  // JWT
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  // Cloudinary
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  numbeo_api_key: process.env.NUMBEO_API_KEY,
  zepto_smpt_user: process.env.ZEPTO_SMTP_USER,
  zepto_smpt_pass: process.env.ZEPTO_SMTP_PASS,
  zepto_api_token: process.env.ZEPTO_API_TOKEN,
  zepto_email_template_key: process.env.ZEPTO_EMAIL_TEMPLATE_KEY,
  ebook_purchase_confirmation_email_template_key:
    process.env.EBOOK_PURCHASE_CONFIRMATION_EMAIL_TEMPLATE_KEY,
  zepto_email_template_key_ebook:
    process.env.ZEPTO_EMAIL_TEMPLATE_KEY_EBOOK_DOWNLOAD,

  zepto_email_template_key_retirement_plan_submission_notification:
    process.env
      .ZEPTO_EMAIL_TEMPLATE_KEY_RETIREMENT_PLAN_SUBMISSION_NOTIFICATION,

  zepto_api_url: process.env.ZEPTO_API_URL,
  mongodb_url: process.env.DATABASE_URL,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  fred_api_key: process.env.FRED_API_KEY,

  default_password: process.env.DEFAULT_PASS,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};

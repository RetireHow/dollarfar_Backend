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
  zepto_email_template_key_ebook:
    process.env.ZEPTO_EMAIL_TEMPLATE_KEY_EBOOK_DOWNLOAD,
  zepto_api_url: process.env.ZEPTO_API_URL,
  mongodb_url: process.env.DATABASE_URL,
};

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  api_key: process.env.API_KEY,
  email_app_password: process.env.EMAIL_APP_PASSWORD,
};

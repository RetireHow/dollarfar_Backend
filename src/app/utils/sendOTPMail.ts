import { SendMailClient } from 'zeptomail';
import config from '../config';
const sendOTPMail = async (data: {
  name: string;
  email: string;
  otp: string;
}) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const zeptoData = {
      template_key:
        '3b2f8.24630c2170da85ea.k1.ed955e60-15f7-11f0-b652-2655081e6903.1961f478746',

      from: {
        address: 'info@dollarfar.com',
        name: 'Dollarfar',
      },
      to: [
        {
          email_address: {
            address: data.email,
            name: data.name,
            otp: data.otp,
          },
        },
      ],
      merge_info: {
        name: data?.name,
        otp: data?.otp,
      },
    };

    const response = await zeptoMailClient.sendMailWithTemplate(zeptoData);
    return response;
  } catch (error) {
    return error;
  }
};

export default sendOTPMail;

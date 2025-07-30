import { SendMailClient } from 'zeptomail';
import config from '../config';
const sendEbookEmail = async (data: { name: string; email: string }) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const zeptoData = {
      template_key: config.zepto_email_template_key_ebook,

      from: {
        address: 'info@dollarfar.com',
        name: 'Dollarfar',
      },
      to: [
        {
          email_address: {
            address: data.email,
            name: data.name,
          },
        },
      ],
      merge_info: {
        name: data?.name,
      },
    };

    const response = await zeptoMailClient.sendMailWithTemplate(zeptoData);
    return response;
  } catch (error) {
    return error;
  }
};

export default sendEbookEmail;

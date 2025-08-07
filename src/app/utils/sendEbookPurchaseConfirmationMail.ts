import { SendMailClient } from 'zeptomail';
import config from '../config';
const sendEbookPurchaseConfirmationMail = async (data: {
  name: string;
  email: string;
  transaction_id: string;
  purchase_date: Date;
}) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const zeptoData = {
      template_key: config.ebook_purchase_confirmation_email_template_key,

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
        transaction_id: data?.transaction_id,
        purchase_date: data?.purchase_date,
      },
    };

    const response = await zeptoMailClient.sendMailWithTemplate(zeptoData);
    return response;
  } catch (error) {
    return error;
  }
};

export default sendEbookPurchaseConfirmationMail;

import { SendMailClient } from 'zeptomail';
import config from '../config';
const sendEmailWtihZeptoApi = async (data: {
  name: string;
  email: string;
  // base64Pdf?: string;
}) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const zeptoData = {
      template_key: config.zepto_email_template_key,

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
      // PDF File Attachments
      // subject: 'Here is your PDF',
      // htmlbody: '<p>Please find the attached PDF.</p>',
      // attachments: [
      //   {
      //     name: 'document.pdf',
      //     content: data.base64Pdf,
      //     mime_type: 'application/pdf',
      //   },
      // ],
    };

    const response = await zeptoMailClient.sendMailWithTemplate(zeptoData);
    return response;
  } catch (error) {
    return error;
  }
};

export default sendEmailWtihZeptoApi;

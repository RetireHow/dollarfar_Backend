import { SendMailClient } from 'zeptomail';
import config from '../config';

interface EmailRecipient {
  address: string;
  name?: string;
}

interface UserEmailOptions {
  to: EmailRecipient[];
  subject: string;
  body: string;
  from?: EmailRecipient;
}

export const sendUserEmail = async ({
  to,
  subject,
  body,
  from = { address: 'info@dollarfar.com', name: 'Dollarfar' },
}: UserEmailOptions) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const emailData = {
      from,
      to: to.map(recipient => ({
        email_address: {
          address: recipient.address,
          name: recipient.name || '',
        },
      })),
      subject,
      htmlbody: body,
    };

    const response = await zeptoMailClient.sendMail(emailData);
    return response;
  } catch (error) {
    console.error('Error sending user email:', error);
    throw error;
  }
};

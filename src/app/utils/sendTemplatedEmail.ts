// utils/email/sendEmail.ts
import { SendMailClient } from 'zeptomail';
import config from '../config';

interface EmailRecipient {
  address: string;
  name?: string;
}

interface SendEmailOptions {
  templateKey: string;
  to: EmailRecipient[];
  from?: EmailRecipient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeInfo?: Record<string, any>;
}

export const sendTemplatedEmail = async ({
  templateKey,
  to,
  from = { address: 'info@dollarfar.com', name: 'Dollarfar' },
  mergeInfo = {},
}: SendEmailOptions) => {
  try {
    const zeptoMailClient = new SendMailClient({
      url: config.zepto_api_url,
      token: config.zepto_api_token,
    });

    const emailData = {
      template_key: templateKey,
      from,
      to: to.map(recipient => ({
        email_address: {
          address: recipient.address,
          name: recipient.name || '',
        },
      })),
      merge_info: mergeInfo,
    };

    const response = await zeptoMailClient.sendMailWithTemplate(emailData);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

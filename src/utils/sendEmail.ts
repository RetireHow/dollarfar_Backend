import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'billal.webdev@gmail.com',
      pass: config.email_app_password,
    },
  });

  await transporter.sendMail({
    from: 'billal.webdev@gmail.com', // sender address
    to, // list of receivers
    subject: 'Thank you for downloading from DollarFar!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};

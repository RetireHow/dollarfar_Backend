import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@retirehow.com',
    pass: config.mail_pass,
  }
});

export const sendEmail = async (to: string, html: string) => {
  await transporter.sendMail({
    from: 'info@retirehow.com', // sender address
    to,
    subject: 'Thank you for downloading from DollarFar!',
    text: '',
    html, // html body
  });
};

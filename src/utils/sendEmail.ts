import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zeptomail.ca',
  port: 587,
  auth: {
    user: 'emailapikey',
    pass: 'MdLT53b1zcAhtEpGRwkHiSk2quBPNUMo+Tp3ie/3B+oos3cD5m6olM6sVs9JnSJaUXxIfsVBfNrOSD9YIgj2qxyS1k+DOPhGiCdVzzj+mDMoU89YqDqK+bMEPDppMkkb1KL0LCZ42wJqAg==',
  },
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

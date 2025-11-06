import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EbookDownloadedUserServices } from './ebookDownloadedUser.service';
import Stripe from 'stripe';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendZeptoEmail } from '../../utils/sendZeptoEmail';

const stripe = new Stripe(config.stripe_secret_key as string);

const createEbookDownloadedUser = catchAsync(async (req, res) => {
  const { fullName, email, mobile, city, ebookName } = req.body;
  const result =
    await EbookDownloadedUserServices.createEbookDownloadedUserIntoDB(
      fullName,
      email,
      mobile,
      city,
      ebookName,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email is sent successfully.',
    data: result,
  });
});

const getEbookDownloadedUsers = catchAsync(async (req, res) => {
  const result =
    await EbookDownloadedUserServices.getEbookDownloadedUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebook downloaded users are retrieved successfully.',
    data: result,
  });
});

// API to create checkout session
const createCheckoutSession = catchAsync(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Retire How?',
            description:
              'A Practical Guide to Retirement Benefits in Canada and the U.S. by Rao Movva, PFP®, CIM®, CIWM, FCSI®',
            images: ['https://i.ibb.co/fdvdLP3q/Book-Cover.png'], // Optional
          },
          unit_amount: 999, // $9.99
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://dollarfar.com/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://dollarfar.com/cancel`,
  });
  res.json({ id: session.id });
});

// Endpoint to retrieve session info and give access to book
const checkoutSession = catchAsync(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string,
  );

  if (session.payment_status === 'paid') {
    res.json({
      downloadUrl: `https://dollarfar.com/ebook/Retire%20How%20A%20Practical%20Guide%20to%20Retirement%20Benefits%20in%20Canada%20and%20the%20U.S.pdf`,
      session,
      success: true,
    });
    const zeptoRes = await sendZeptoEmail({
      templateKey:
        config.ebook_purchase_confirmation_email_template_key as string,
      to: [
        {
          address: session?.customer_details?.email as string,
          name: session?.customer_details?.name as string,
        },
      ],
      mergeInfo: {
        name: session?.customer_details?.name,
        transaction_id: session?.payment_intent,
        purchase_date: new Date(),
      },
    });

    if (zeptoRes.error) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, zeptoRes.error);
    }
  } else {
    res.status(403).json({ error: 'Payment not completed' });
  }
});

export const EbookDownloadedUserControllers = {
  createEbookDownloadedUser,
  getEbookDownloadedUsers,
  createCheckoutSession,
  checkoutSession,
};

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { ConsultationSubscriptionControllers } from './app/modules/consultationSubscription/consultationSubscription.controller';

const app: Application = express();

// This is ONLY for the webhook route
app.post(
  '/api/v1/webhook/consultation-subscribe',
  express.raw({ type: 'application/json' }),
  ConsultationSubscriptionControllers.handleConsultationSubscriptionSuccessWebhook,
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['https://dollarfar.com', 'http://localhost:5173'],
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Dollarfar !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

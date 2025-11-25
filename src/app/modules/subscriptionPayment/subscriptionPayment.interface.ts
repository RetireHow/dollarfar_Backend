// types/subscriptionPayment.ts
export type TSubscriptionPayment = {
  _id?: string;
  paymentIntentId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
  currency: string;
  status:
    | 'processing'
    | 'succeeded'
    | 'failed'
    | 'requires_payment_method'
    | 'canceled';
};

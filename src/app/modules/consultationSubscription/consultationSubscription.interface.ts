export type SubscriptionStatus = 'active' | 'expired' | 'used' | 'cancelled';

// For creating a new subscription
export type TConsultationSubscription = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  paymentIntentId: string;
  amountPaid?: number;
  currency?: string;
  sessionsPurchased?: number;
  sessionsUsed?: number;
  purchaseDate?: Date;
  expiryDate: Date;
  status?: SubscriptionStatus;
};

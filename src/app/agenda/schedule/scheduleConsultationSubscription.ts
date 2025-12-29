/* eslint-disable @typescript-eslint/no-explicit-any */

import { agenda } from '..';

export const scheduleConsultationSubscriptionExpiry = async (
  consultationSubscription: any,
) => {
  await agenda.schedule(
    consultationSubscription.expiryDate,
    'expire-consultation-subscription',
    {
      testId: consultationSubscription._id,
    },
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConsultationSubscription } from '../../modules/consultationSubscription/consultationSubscription.model';

export const defineExpireConsultationSubscriptionJob = (agenda: any) => {
  agenda.define('expire-consultation-subscription', async (job: any) => {
    const { consultationSubscriptionId } = job.attrs.data;

    await ConsultationSubscription.findByIdAndUpdate(
      consultationSubscriptionId,
      {
        status: 'expired',
      },
    );
  });
};

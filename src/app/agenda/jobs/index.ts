/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineExpireConsultationSubscriptionJob } from './expireConsultationSubscription.job';

export const loadJobs = (agenda: any) => {
  defineExpireConsultationSubscriptionJob(agenda);
};

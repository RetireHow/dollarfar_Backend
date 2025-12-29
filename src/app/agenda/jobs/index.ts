/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineExpireDemoJob } from './expireDemo.job';

export const loadJobs = (agenda: any) => {
  defineExpireDemoJob(agenda);
};

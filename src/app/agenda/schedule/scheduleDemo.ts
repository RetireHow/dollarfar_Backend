/* eslint-disable @typescript-eslint/no-explicit-any */

import { agenda } from '..';

export const scheduleJobExpiry = async (demo: any) => {
  await agenda.schedule(demo.expiryDate, 'expire-demo', {
    testId: demo._id,
  });
};

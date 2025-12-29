/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const defineExpireDemoJob = (agenda: any) => {
  agenda.define('expire-demo', async (job: any) => {
    // const { demoId } = job.attrs.data;
    // await Model.findByIdAndUpdate(demoId, {
    //   status: 'expired',
    // });
  });
};

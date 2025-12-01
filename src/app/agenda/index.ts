import Agenda from 'agenda';
import config from '../config';
import { loadJobs } from './jobs';

export const agenda = new Agenda({
  db: {
    address: config.mongodb_url!,
    collection: 'consultationSubscriptionJobs',
  },
});

agenda.on('ready', async () => {
  await agenda.start();
  loadJobs(agenda); // load all job definitions
});

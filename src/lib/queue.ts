import { Queue, Worker } from 'bullmq';
import redis from './redis';

export const campaignQueue = new Queue('campaigns', {
  connection: redis,
});

export function createCampaignWorker() {
  return new Worker(
    'campaigns',
    async (job) => {
      console.log('Processing campaign:', job.id);
      // Campaign processing logic here
      return { success: true };
    },
    { connection: redis }
  );
}

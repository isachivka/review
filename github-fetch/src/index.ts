import 'cross-fetch/polyfill';
import cron from 'node-cron';
import client, { owner, repository } from './client';
import { PullRequests } from './queries/types/PullRequests';
import getPullRequests from './queries/getPullRequests';

client.query<PullRequests>({
  query: getPullRequests,
  variables: { owner, repository },
})
  .then(({ data }) => {
    if (data.repository) {
      console.log(JSON.stringify(data.repository.pullRequests.nodes));
    }
  });

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});

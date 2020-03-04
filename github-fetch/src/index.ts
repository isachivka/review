import 'cross-fetch/polyfill';
import cron from 'node-cron';
import superagent from 'superagent';
import config from 'config';
import client, { owner, repository } from './client';
import getPullRequests from './queries/getPullRequests';
import { PullRequestsQuery } from './types/graphql';
import logs from '@review/logs';

const putApi = `${config.get('eventsApi')}/put`;

logs.githubFetch.log('Successfully started')

cron.schedule('* * * * *', () => {
  client.query<PullRequestsQuery>({
    query: getPullRequests,
    variables: { owner, repository },
  })
    .then(({ data }) => {
      if (data.repository && data.repository.pullRequests.nodes) {
        superagent
          .put(putApi)
          .set('Content-Type', 'application/json')
          .send(data.repository.pullRequests.nodes)
          .then((response) => {
            logs.githubFetch.log('Successfully send nodes. Response:', response.text);
          })
          .catch((error) => {
            logs.githubFetch.error('Error send nodes:', error);
          });
      } else {
        logs.githubFetch.error('Something wrong, response do not contains PullRequests');
      }
    });
});

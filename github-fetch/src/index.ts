import 'cross-fetch/polyfill';
import cron from 'node-cron';
import superagent from 'superagent';
import config from 'config';
import client, { owner, repository } from './client';
import { PullRequests } from './queries/types/PullRequests';
import getPullRequests from './queries/getPullRequests';

const putApi = `${config.get('eventsApi')}/put`;

cron.schedule('* * * * *', () => {
  client.query<PullRequests>({
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
            console.log('[@review/github-fetch] Successfully send nodes:', response.text);
          })
          .catch((error) => {
            console.log('[@review/github-fetch] Error send nodes:', error);
          });
      } else {
        console.log('[@review/github-fetch] Something wrong, response do not contains PullRequests');
      }
    });
});

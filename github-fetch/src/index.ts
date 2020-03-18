import 'cross-fetch/polyfill';
import cron from 'node-cron';
import superagent from 'superagent';
import config from 'config';
import client, { owner, repository } from './client';
import getPullRequests from './queries/getPullRequests';
import { PullRequestsQuery, PullRequestsQueryVariables } from './types/graphql';
import logs from '@review/logs';
import { getAllBranches, mapBranches, MappedBranches } from './branches';
import doMongo from '@review/core/doMongo';

const putApi = `${config.get('eventsApi')}/put`;

logs.githubFetch.log('Successfully started');

// Every minute
cron.schedule('* * * * *', () => {
  client.query<PullRequestsQuery, PullRequestsQueryVariables>({
    query: getPullRequests,
    variables: { owner, repository },
    fetchPolicy: 'no-cache',
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

// Every ten minutes
cron.schedule('*/10 * * * *', () => {
  getAllBranches()
    .then(mapBranches)
    .then((data: MappedBranches) => {
      doMongo(async (db, close) => {
        const collection = db.collection('branches');
        await collection.deleteMany({});
        await collection.insertMany(data);
        logs.githubFetch.log('Save branches success. Length:', data.length);

        close();
      });
    });
});

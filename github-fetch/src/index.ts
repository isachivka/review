import 'cross-fetch/polyfill';
import cron from 'node-cron';
import superagent from 'superagent';
import config from 'config';
import { format, sub } from 'date-fns';

import client, { owner, repository } from './client';
import getPullRequests from './queries/getPullRequests';
import getMergedPullRequests from './queries/getMergedPullRequests';
import {
  PullRequestsQuery,
  PullRequestsQueryVariables,
  MergedPullRequestsQuery,
  MergedPullRequestsQueryVariables,
} from './types/graphql';
import logs from '@review/logs';
import { getAllBranches, mapBranches, MappedBranches } from './branches';
import doMongo from '@review/core/doMongo';

logs.githubFetch.log('Successfully started');

function fetchMergedPullRequests() {
  const date2weeksAgo = format(sub(new Date(), { weeks: 2 }), 'yyyy-MM-dd');
  client.query<MergedPullRequestsQuery, MergedPullRequestsQueryVariables>({
    query: getMergedPullRequests,
    variables: { query: `repo:${owner}/${repository} is:pr is:merged merged:>${date2weeksAgo}` },
    fetchPolicy: 'no-cache',
  })
    .then(({ data }) => {
      if (data.search && data.search.edges) {
        const { edges } = data.search;
        const pullRequests = edges.map(edge => edge && edge.node);
        superagent
          .put(`${config.get('eventsApi')}/putMerged`)
          .set('Content-Type', 'application/json')
          .send(pullRequests)
          .then((response) => {
            logs.githubFetch.log(`Successfully send merged nodes. Response:`, response.text);
          })
          .catch((error) => {
            logs.githubFetch.error(`Error send merged nodes:`, error);
          });
      } else {
        logs.githubFetch.error(`Something wrong, response do not contains merged PullRequests`);
      }
    })
}

function fetchOpenPullRequests() {
  client.query<PullRequestsQuery, PullRequestsQueryVariables>({
    query: getPullRequests,
    variables: { owner, repository },
    fetchPolicy: 'no-cache',
  })
    .then(({ data }) => {
      if (data.repository && data.repository.pullRequests.nodes) {
        superagent
          .put(`${config.get('eventsApi')}/putOpened`)
          .set('Content-Type', 'application/json')
          .send(data.repository.pullRequests.nodes)
          .then((response) => {
            logs.githubFetch.log(`Successfully send open nodes. Response:`, response.text);
          })
          .catch((error) => {
            logs.githubFetch.error(`Error send open nodes:`, error);
          });
      } else {
        logs.githubFetch.error(`Something wrong, response do not contains open PullRequests`);
      }
    });
}

function fetchAllBranches() {
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
}

fetchMergedPullRequests();
fetchAllBranches();

// Every hour fetch merged pull requests
cron.schedule('*/60 * * * *', fetchMergedPullRequests);

// Every minute fetch open pull requests
cron.schedule('* * * * *', fetchOpenPullRequests);

// Every hour fetch all branches
cron.schedule('*/60 * * * *', fetchAllBranches);

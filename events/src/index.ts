import express from 'express';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import doMongo from '@review/core/doMongo';
import generateEvents from './generateEvents';
import logs from '@review/logs';

import pullRequestCreated from './events/pullRequestCreated';
import pullRequestApproved from './events/pullRequestApproved';

const generators = [
  pullRequestCreated,
  pullRequestApproved,
];

const port = 4000;
const app = express();
app.use(express.json());

app.put('/put', (request, response) => {
  const pullRequests: PullRequests = request.body;
  response.status(200).send('Okay');

  doMongo(async (db, close) => {
    try {
      const pullRequestsCollection = db.collection('prs');
      const prevPullRequests = await pullRequestsCollection.find({}).toArray();
      await pullRequestsCollection.deleteMany({});
      await pullRequestsCollection.insertMany(pullRequests);

      // Generate event if we have data for compare
      // and save it to mongodb
      if (prevPullRequests.length > 0) {
        const events = await generateEvents(
          generators,
          prevPullRequests,
          pullRequests,
        );

        const eventsCollection = db.collection('events');
        if (events.length > 0) {
          await eventsCollection.insertMany(events);
          logs.events.log('Events written to collection:', events);
        }
      }
    } catch (e) {
      logs.events.error(e);
    }

    close();
  });
});

app.listen(port, () => {
  logs.events.log(`Listen port ${port}`);
});

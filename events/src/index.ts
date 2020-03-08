import express from 'express';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import doMongo from './mongo';
import generateEvents from './generateEvents';
import logs from '@review/logs';

import pullRequestCreated from './events/pullRequestCreated';

const generators = [
  pullRequestCreated,
];

const port = 3000;
const app = express();
app.use(express.json());

app.put('/put', (request, response) => {
  const pullRequests: PullRequests = request.body;
  response.status(200).send('Okay');

  doMongo(async (db, close) => {
    const collection = db.collection('prs');
    const prevPullRequests = await collection.find({}).toArray();
    await collection.deleteMany({});
    await collection.insertMany(pullRequests);
    close();

    const events = await generateEvents(
      generators,
      prevPullRequests,
      pullRequests,
    );

    logs.events.log(events);
  });
});

app.listen(port, () => {
  logs.events.log(`Listen port ${port}`);
});

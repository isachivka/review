import express from 'express';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import doMongo from './mongo';
import logs from '@review/logs';

const port = 3000;
const app = express();
app.use(express.json());

app.put('/put', (request, response) => {
  const pullRequests: PullRequests = request.body;
  response.status(200).send('Okay');

  doMongo(async (db, callback) => {
    const collection = db.collection('prs');
    const prevPullRequests = await collection.find({}).toArray();
    await collection.deleteMany({});
    await collection.insertMany(pullRequests);
    logs.events.log({ prevPullRequests, pullRequests });
    callback();
  });
});

app.listen(port, () => {
  logs.events.log(`Listen port ${port}`);
});

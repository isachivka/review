import express from 'express';
import { PullRequests } from '@review/github-fetch/src/types/shared';
import doMongo from './mongo';

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
    console.log({ prevPullRequests, pullRequests });
    callback();
  });
});

app.listen(port, () => {
  console.log(`[@review/events] Listen port ${port}`);
});

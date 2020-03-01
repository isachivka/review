import express from 'express';
import { MongoClient } from 'mongodb';
import { PullRequests } from '@review/github-fetch/src/types/shared';

const port = 3000;
const app = express();
app.use(express.json());

const url = 'mongodb://mongodb/review';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('[@review/events] Connection to mongodb failed', err);
    client.close();
    return;
  }

  console.log('[@review/events] Connected successfully to server');
  client.close();
});

app.put('/put', (request, response) => {
  const pullRequests: PullRequests = request.body;
  console.log(pullRequests);
  response.status(200).send('Okay');
});

app.listen(port, () => {
  console.log(`[@review/events] Listen port ${port}`);
});

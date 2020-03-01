import express from 'express';
import { MongoClient } from 'mongodb';

const port = 3000;
const app = express();
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'review';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  const db = client.db(dbName);
  console.log("[@review/events] Connected successfully to server", err, db);
  client.close();
});

app.put('/put', (request, response) => {
  console.log(request.body);
  response.status(200).send('Okay');
});

app.listen(port, () => {
  console.log(`[@review/events] Listen port ${port}`);
});

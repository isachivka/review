import express from 'express';
import { MongoClient } from 'mongodb';

const port = 3000;
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'review';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  const db = client.db(dbName);
  console.log(err, db, "Connected successfully to server");
  client.close();
});

app.listen(port, () => {
  console.log(`Event generator listen port ${port}`);
});

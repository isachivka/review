import express from 'express';
import cors from 'cors';
import doMongo from '@review/events/src/mongo';
import logs from '@review/logs';

const port = 5001;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/list', (_, response) => {
  doMongo(async (db, close) => {
    const collection = db.collection('prs');
    const pullRequests = await collection.find({}).toArray();
    response.status(200);
    response.send(pullRequests);
    close();
  });
});

app.listen(port, () => {
  logs.events.log(`Listen port ${port}`);
});

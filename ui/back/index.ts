import express from 'express';
import cors from 'cors';
import doMongo from '@review/core/doMongo';
import logs from '@review/logs';
import path from 'path';

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../../')));

app.get('/prs', (_, response) => {
  doMongo(async (db, close) => {
    const collection = db.collection('prs');
    const pullRequests = await collection.find({}).toArray();
    response.status(200);
    response.send(pullRequests);
    close();
  });
});

app.get('/branches', (_, response) => {
  doMongo(async (db, close) => {
    const collection = db.collection('branches');
    const branches = await collection.find({}).toArray();
    response.status(200);
    response.send(branches);
    close();
  });
});

app.get('/events', (_, response) => {
  doMongo(async (db, close) => {
    const collection = db.collection('events');
    const events = await collection.find({}).toArray();
    response.status(200);
    response.send(events);
    close();
  });
});

app.put('/events/clean', (_, response) => {
  doMongo(async (db, close) => {
    const collection = db.collection('events');
    await collection.deleteMany({});
    const events = await collection.find({}).toArray();
    response.status(200);
    response.send(events);
    close();
  });
});

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, '../../../index.html'));
});

app.listen(port, () => {
  logs.ui.log(`Listen port ${port}`);
});

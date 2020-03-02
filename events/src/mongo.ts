import { Db, MongoClient } from 'mongodb';

const dbName = 'review';
const url = `mongodb://mongodb/${dbName}`;
let init = true;

function doMongo(callback: (db: Db, callback: () => void) => void): void {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('[@review/events] Connection to mongodb failed', err);
      client.close();
      return;
    }

    if (init === true) {
      console.log('[@review/events] Connected successfully to server');
      init = false;
    }
    const db = client.db(dbName);
    callback(db, () => client.close());
  });
}

export default doMongo;

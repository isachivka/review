import { Db, MongoClient } from 'mongodb';
import logs from '@review/logs';

const dbName = 'review';
const url = `mongodb://mongodb/${dbName}`;
let init = true;

function doMongo(callback: (db: Db, callback: () => void) => void): void {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      logs.core.error('Connection to mongodb failed', err);
      client.close();
      return;
    }

    if (init === true) {
      logs.core.log('Connected successfully to server');
      init = false;
    }
    const db = client.db(dbName);
    callback(db, () => client.close());
  });
}

export default doMongo;

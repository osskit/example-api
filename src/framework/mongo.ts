import type { Db } from 'mongodb';
import { MongoClient, ReadPreference } from 'mongodb';
import { logger } from './logger.js';

import { mongoDb, mongoUri } from './environment.js';

let connection: {
  db: Db;
  client: MongoClient;
};

export const defaultProjection = { _id: 0 } as const;

const connect = ({ uri, dbName }: { uri: string; dbName: string }) =>
  MongoClient.connect(`${uri}/${dbName}`, {
    readPreference: ReadPreference.PRIMARY,
    retryWrites: true,
    w: 'majority',
  });

export const init = async () => {
  try {
    const client = await connect({ uri: mongoUri, dbName: mongoDb });

    connection = {
      client,
      db: client.db(mongoDb),
    };

    logger.info('connected to mongo');
  } catch (error) {
    throw new Error(`couldn't connect to mongo ${error}`);
  }
};

export const getCollection = <T>(collectionName: string) => connection.db.collection<T>(collectionName);

export const ping = () => connection.db.command({ ping: 1 });

export const close = () => connection.client.close();

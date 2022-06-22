import type { Db } from 'mongodb';
import { MongoClient, ReadPreference } from 'mongodb';
import type { Example } from '../../packages/client';

let connection: {
  db: Db;
  client: MongoClient;
};

export const init = async () => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      ignoreUndefined: true,
      readPreference: ReadPreference.PRIMARY,
    });

    connection = {
      client,
      db: client.db('service'),
    };

    return;
  } catch (error: any) {
    throw new Error(`couldn't connect to mongo - ${error?.message}`);
  }
};
const getCollection = <T>(collectionName: string) => connection.db.collection<T>(collectionName);

const getExampleCollection = () => getCollection<Example>('examples');

export const clear = async () => {
  await getExampleCollection().deleteMany({});
};

export const insertExamples = (examples: Example[]) => getExampleCollection().insertMany(examples);

export const close = () => (connection.client ? connection.client.close() : null);

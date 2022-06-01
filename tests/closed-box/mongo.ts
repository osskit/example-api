import type { Db } from 'mongodb';
import { MongoClient, ReadPreference } from 'mongodb';
import type { Pokemon } from '../../packages/client';

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

const getPokemonCollection = () => getCollection<Pokemon>('pokemons');

export const clear = async () => {
  await getPokemonCollection().deleteMany({});
};

export const insertPokemons = (pokemons: Pokemon[]) => getPokemonCollection().insertMany(pokemons);

export const close = () => (connection.client ? connection.client.close() : null);

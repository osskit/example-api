import { createMonitor } from '@osskit/monitor';
import { ReturnDocument } from 'mongodb';
import { getCollection } from '../framework/mongo.js';
import type { Pokemon, UUID } from '../schemas/models.js';
import type { Meta } from '../schemas/api.js';

const monitor = createMonitor({ scope: 'mongo' });

const getPokemonCollection = () => getCollection<Pokemon>('pokemon');

export const getPokemon = (id: UUID, meta: Meta): Promise<Pokemon | null> =>
  monitor('getPokemon', () => getPokemonCollection().findOne({ id }), { context: { id, meta } });

export const upsertPokemon = (pokemon: Pokemon, meta: Meta): Promise<Pokemon> =>
  monitor(
    'upsertPokemon',
    async () => {
      const result = await getPokemonCollection().findOneAndUpdate(
        pokemon,
        {
          $set: pokemon,
        },
        {
          upsert: true,
          returnDocument: ReturnDocument.AFTER,
        },
      );

      if (!result.ok) {
        throw new Error('Pokemon could not created');
      }

      return result.value!;
    },
    {
      context: {
        pokemon,
        meta,
      },
    },
  );

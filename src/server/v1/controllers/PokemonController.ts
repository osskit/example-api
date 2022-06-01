import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
import type { FastifyInstance } from 'fastify';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import httpStatus from 'http-status';
import type { PascalCasedProperties } from 'type-fest';
import { getPokemon, upsertPokemon } from '../../../services/mongo.js';
import type { Pokemon } from '../../../schemas/models.js';
import { pokemonRef, uuidRef } from '../../../schemas/models.js';
import { requestBaseSchema } from '../../../schemas/api.js';
import { security } from '../../plugins/openapi.js';

const tags = ['Pokemons'];
const getPokemonQuerySchema = Type.Object({ id: uuidRef, correlationId: Type.Optional(uuidRef) });
const pokemonPostRequestSchema = requestBaseSchema(pokemonRef, 'CreatePokemonPayload');

export const pokemon = async (fastify: FastifyInstance) => {
  fastify.get<PascalCasedProperties<{ querystring: Static<typeof getPokemonQuerySchema>; reply: Pokemon }>>(
    '',
    {
      schema: {
        operationId: 'getPokemon',
        tags,
        security,
        querystring: getPokemonQuerySchema,
        response: { [httpStatus.OK]: pokemonRef },
      },
    },
    async ({ query: { id, correlationId } }) => {
      const pokemon = await getPokemon({ id }, { correlationId: correlationId ?? uuid() });

      if (!pokemon) {
        throw createError(404, 'pokemon not found');
      }

      return pokemon;
    },
  );

  fastify.post<PascalCasedProperties<{ body: Static<typeof pokemonPostRequestSchema>; reply: Pokemon }>>(
    '',
    {
      schema: {
        operationId: 'createPokemon',
        tags,
        security,
        body: pokemonPostRequestSchema,
        response: { [httpStatus.OK]: pokemonRef },
      },
    },
    async ({ body: { payload, meta: initialMeta } }) => {
      const meta = { correlationId: uuid(), ...initialMeta };

      return upsertPokemon(payload, meta);
    },
  );
};

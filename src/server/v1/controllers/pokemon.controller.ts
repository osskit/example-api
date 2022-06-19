import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
import type { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import httpStatus from 'http-status';
import { getPokemon, upsertPokemon } from '../../../services/mongo.js';
import { pokemonRef, uuidRef } from '../../../schemas/models.js';
import { security } from '../../plugins/openapi.js';

const tags = ['Pokemons'];
const getPokemonQuerySchema = Type.Object({ id: uuidRef, correlationId: Type.Optional(uuidRef) });

export const pokemon = async (fastify: FastifyInstance) => {
  fastify.get(
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
      const pokemon = await getPokemon(id, { correlationId: correlationId ?? uuid() });

      if (!pokemon) {
        throw createError(404, 'pokemon not found');
      }

      return pokemon;
    },
  );

  fastify.post(
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

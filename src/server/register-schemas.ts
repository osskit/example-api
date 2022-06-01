import type { FastifyInstance } from 'fastify';
import { metaSchema } from '../schemas/api.js';
import { pokemonTypeSchema, uuidSchema, pokemonSchema } from '../schemas/models.js';

export const registerSchemas = (fastify: FastifyInstance) => {
  fastify.addSchema(uuidSchema);
  fastify.addSchema(pokemonSchema);
  fastify.addSchema(metaSchema);
  fastify.addSchema(pokemonTypeSchema);
};

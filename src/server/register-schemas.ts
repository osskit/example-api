import type { FastifyInstance } from 'fastify';
import { pokemonTypeSchema, uuidSchema, pokemonSchema } from '../schemas/models.js';

export const registerSchemas = (fastify: FastifyInstance) => {
  fastify.addSchema(uuidSchema);
  fastify.addSchema(pokemonSchema);
  fastify.addSchema(pokemonTypeSchema);
};

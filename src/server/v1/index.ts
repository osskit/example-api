import type { FastifyInstance } from 'fastify';
import { pokemon } from './controllers/pokemon.controller.js';

export const v1 = async (fastify: FastifyInstance) => {
  await fastify.register(pokemon, { prefix: '/pokemons' });
};

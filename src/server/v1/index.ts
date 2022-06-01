import type { FastifyInstance } from 'fastify';
import { pokemon } from './controllers/PokemonController.js';

export const v1 = async (fastify: FastifyInstance) => {
  await fastify.register(pokemon, { prefix: '/pokemons' });
};

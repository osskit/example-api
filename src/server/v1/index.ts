import type { TypeBoxFastifyInstance } from '../../types/fastify';
import { exampleController } from './controllers/example.controller.js';

export const v1 = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(exampleController, { prefix: '/examples' });
};

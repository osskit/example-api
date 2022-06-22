import { exampleTypeSchema, uuidSchema, exampleSchema } from '../schemas/models.js';
import type { TypeBoxFastifyInstance } from '../types/fastify.js';

export const registerSchemas = (fastify: TypeBoxFastifyInstance) => {
  fastify.addSchema(uuidSchema);
  fastify.addSchema(exampleSchema);
  fastify.addSchema(exampleTypeSchema);
};

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { logger } from '../framework/logger.js';
import { trace } from './plugins/tracing.js';
import { enforceHeaders } from './plugins/enforceHeaders.js';
import { helmet } from './plugins/helmet.js';
import { metrics } from './plugins/metrics.js';
import { v1 } from './v1/index.js';
import { openapi } from './plugins/openapi.js';
import { registerSchemas } from './register-schemas.js';

const fastify = Fastify({
  logger,
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
});

export const init = async () => {
  registerSchemas(fastify);
  await openapi(fastify);

  await trace(fastify);
  await metrics(fastify);
  await enforceHeaders(fastify);
  await fastify.register(fastifyCors);
  await helmet(fastify);

  await fastify.register(v1, { prefix: '/v1' });

  return fastify;
};

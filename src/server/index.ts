import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { enforceHeaders } from '@osskit/fastify-enforce-headers';
import { logger } from '../framework/logger.js';
import { trace } from './plugins/tracing.js';
import { helmet } from './plugins/helmet.js';
import { metrics } from './plugins/metrics.js';
import { v1 } from './v1/index.js';
import { openapi } from './plugins/openapi.js';
import { registerSchemas } from './register-schemas.js';

const server = fastify({
  logger,
  ajv: {
    customOptions: {
      coerceTypes: 'array',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

export const init = async () => {
  registerSchemas(server);
  await openapi(server);

  await trace(server);
  await metrics(server);
  await server.register(enforceHeaders);
  await server.register(fastifyCors);
  await helmet(server);

  await server.register(v1, { prefix: '/v1' });

  return server;
};

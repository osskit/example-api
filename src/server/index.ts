import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ajvTypeBoxPlugin } from '@fastify/type-provider-typebox';
import { enforceHeaders } from '@osskit/fastify-enforce-headers';
import { logger } from '../framework/logger.js';
import { trace } from './plugins/tracing.js';
import { helmet } from './plugins/helmet.js';
import { metrics } from './plugins/metrics.js';
import { v1 } from './v1/index.js';
import { openapi } from './plugins/openapi.js';
import { registerSchemas } from './register-schemas.js';

const fastify = Fastify({
  logger,
  ajv: {
    plugins: [ajvTypeBoxPlugin],
    customOptions: {
      coerceTypes: 'array',
      strict: 'log',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

export const init = async () => {
  registerSchemas(fastify);
  await openapi(fastify);

  await trace(fastify);
  await metrics(fastify);
  await fastify.register(enforceHeaders);
  await fastify.register(fastifyCors);
  await helmet(fastify);

  await fastify.register(v1, { prefix: '/v1' });

  return fastify;
};

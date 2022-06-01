import type { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';

export const helmet = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyHelmet, (instance) => ({
    contentSecurityPolicy: {
      directives: {
        ...fastifyHelmet.contentSecurityPolicy.getDefaultDirectives(),
        /* eslint-disable @typescript-eslint/naming-convention */
        'form-action': ["'self'"],
        'img-src': ["'self'", 'data:', 'validator.swagger.io'],
        'script-src': ["'self'", ...instance.swaggerCSP.script],
        'style-src': ["'self'", 'https:', ...instance.swaggerCSP.style],
        /* eslint-enable @typescript-eslint/naming-convention */
      },
    },
  }));
};

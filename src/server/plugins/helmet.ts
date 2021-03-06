import fastifyHelmet from '@fastify/helmet';
import type { TypeBoxFastifyInstance } from '../../types/fastify';

export const helmet = async (fastify: TypeBoxFastifyInstance) => {
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

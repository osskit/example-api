import fastifySwagger from '@fastify/swagger';
import { nodeEnv } from '../../framework/environment.js';
import type { TypeBoxFastifyInstance } from '../../types/fastify';

export const security = [
  {
    oauth: [],
  },
];

export const openapi = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'service-example',
        version: '0.0.0',
        contact: {},
      },
      servers: [
        nodeEnv === 'production'
          ? {
              url: 'https://service-examples.examples.net/v1',
              description: 'Prod',
            }
          : {
              url: 'http://localhost:3000/v1',
              description: 'Local',
            },
      ],
      components: {
        securitySchemes: {
          oauth: {
            type: 'oauth2',
            flows: {
              implicit: {
                authorizationUrl: '',
                scopes: {},
              },
            },
          },
        },
      },
    },
    exposeRoute: true,
    refResolver: {
      buildLocalReference: (json, _, _fragment, i) => (json.$id as string) ?? `def-${i}`,
    },
  });
};

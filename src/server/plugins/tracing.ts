import type { FastifyInstance } from 'fastify';
import { fastifyRequestContextPlugin, requestContext } from '@fastify/request-context';
import { setGlobalContext } from '@osskit/monitor';

setGlobalContext(() => requestContext.get('tracing') as Record<string, string>);

export const trace = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyRequestContextPlugin);

  fastify.addHook('onRequest', async ({headers}) => {
    requestContext.set('tracing', {
      'x-request-id': headers['x-request-id']?.toString(),
      'x-b3-traceid': headers['x-b3-traceid']?.toString(),
      'x-b3-spanid': headers['x-b3-spanid']?.toString(),
      'x-b3-sampled': headers['x-b3-sampled']?.toString(),
    });
  });
};

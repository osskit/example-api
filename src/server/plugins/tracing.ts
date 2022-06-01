import type { FastifyInstance } from 'fastify';
import { fastifyRequestContextPlugin, requestContext } from '@fastify/request-context';
import { setGlobalContext } from '@osskit/monitor';

setGlobalContext(() => requestContext.get('tracing') as Record<string, string>);

export const trace = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyRequestContextPlugin);

  fastify.addHook('onRequest', async (req) => {
    requestContext.set('tracing', {
      'x-request-id': req.headers['x-request-id']?.toString(),
      'x-b3-traceid': req.headers['x-b3-traceid']?.toString(),
      'x-b3-spanid': req.headers['x-b3-spanid']?.toString(),
      'x-b3-sampled': req.headers['x-b3-sampled']?.toString(),
    });
  });
};

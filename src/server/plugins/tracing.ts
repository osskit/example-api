import { fastifyRequestContextPlugin, requestContext } from '@fastify/request-context';
import { setGlobalContext } from '@osskit/monitor';
import type { TypeBoxFastifyInstance } from '../../types/fastify';

setGlobalContext(() => requestContext.get('tracing') as Record<string, string>);

export const trace = async (fastify: TypeBoxFastifyInstance) => {
  await fastify.register(fastifyRequestContextPlugin);

  fastify.addHook('onRequest', async ({ headers }: { headers: Record<string, string | undefined> }) => {
    requestContext.set('tracing', {
      'x-request-id': headers['x-request-id']?.toString(),
      'x-b3-traceid': headers['x-b3-traceid']?.toString(),
      'x-b3-spanid': headers['x-b3-spanid']?.toString(),
      'x-b3-sampled': headers['x-b3-sampled']?.toString(),
    });
  });
};

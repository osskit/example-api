import type { FastifyInstance } from 'fastify';
import createError from 'http-errors';
import { nodeEnv } from '../../framework/environment.js';

const requiredHeaders = ['x-api-client', 'x-api-client-version'];

export const enforceHeaders = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (req) => {
    if (nodeEnv !== 'production' || !requiredHeaders.some((header) => !req.headers[header]?.toString())) {
      return;
    }

    throw createError(400, 'Missing required headers in request');
  });
};

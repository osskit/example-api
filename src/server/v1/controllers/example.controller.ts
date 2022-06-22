import createError from 'http-errors';
import { Type } from '@sinclair/typebox';
import httpStatus from 'http-status';
import { getExample, createExample } from '../../../services/mongo.js';
import { exampleRef, uuidRef } from '../../../schemas/models.js';
import { security } from '../../plugins/openapi.js';
import type { TypeBoxFastifyInstance } from '../../../types/fastify.js';
import { createExamplePayloadSchema } from '../../../schemas/api.js';

const tags = ['Examples'];

export const exampleController = async (fastify: TypeBoxFastifyInstance) => {
  fastify.get(
    '',
    {
      schema: {
        operationId: 'getExample',
        tags,
        security,
        querystring: Type.Object({ id: uuidRef }),
        response: { [httpStatus.OK]: exampleRef },
      },
    },
    async ({ query: { id } }) => {
      const example = await getExample(id);

      if (!example) {
        throw createError(404, 'Example not found');
      }

      return example;
    },
  );

  fastify.post(
    '',
    {
      schema: {
        operationId: 'createExample',
        tags,
        security,
        body: createExamplePayloadSchema,
        response: { [httpStatus.OK]: exampleRef },
      },
    },
    async ({ body }) => createExample(body),
  );
};

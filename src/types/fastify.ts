import type { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import type { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify/types/utils';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export type TypeBoxFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>;

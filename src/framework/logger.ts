import pino from 'pino';

export const logger = pino({
  level: 'debug',
  messageKey: 'message',
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

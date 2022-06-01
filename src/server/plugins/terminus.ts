import type { Server } from 'http';
import { setTimeout } from 'timers/promises';
import { createTerminus } from '@godaddy/terminus';
import { logger } from '../../framework/logger.js';
import { close, ping } from '../../framework/mongo.js';

const onHealthCheck = async () => ping();

export default (server: Server) => {
  createTerminus(server, {
    healthChecks: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '/healthcheck': onHealthCheck,
      verbatim: true,
    },

    async onSignal() {
      logger.info('server received a signal to shut down');
      await close();
    },

    async onShutdown() {
      logger.info('server shutting down');
    },

    logger(msg, err) {
      logger.error({ err }, msg);
    },

    signals: ['SIGINT', 'SIGTERM'],

    async beforeShutdown() {
      logger.info('before shutting down');
      await setTimeout(5000);
    },
  });
};

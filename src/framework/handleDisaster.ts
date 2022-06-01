import { logger } from './logger.js';

export default () => {
  process.on('uncaughtException', (err: Error) => {
    logger.fatal({ err }, 'Uncaught exception caught in global handler');
    process.exit(1);
  });

  process.on('unhandledRejection', (err: Error) => {
    logger.fatal({ err }, 'Unhandled promise rejection caught in global handler');
    process.exit(1);
  });

  process.on('warning', (err: Error) => {
    logger.warn({ err }, 'Warning caught in global handler');
  });
};

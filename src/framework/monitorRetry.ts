import { Counter } from 'prom-client';
import type { FetchError } from '@osskit/fetch-enhancers';
import { replaceUrlValues } from 'replace-url-values';
import { serviceName } from './environment.js';

const retryCounter = new Counter({
  name: `${serviceName.replaceAll('-', '_')}_retries`,
  help: 'service retry counter',
  labelNames: ['path', 'reason', 'attempt'],
});

export default (err: FetchError) => {
  retryCounter.inc({
    path: err.url ? replaceUrlValues(err.url) : 'unknown',
    reason: err.data?.status ?? 'unknown',
    attempt: err.data?.attempt,
  });
};

import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'ts-jest': {
      useESM: true,
    },
  },
};

export default config;

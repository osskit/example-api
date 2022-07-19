import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'ts-jest': {
      useESM: true,
      useIsolatedModules: true,
      diagnostics: {
        exclude: ['!**/*.spec.ts'],
      },
    },
  },
  moduleNameMapper: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;

import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = loadEnv('', __dirname, 'VITE_');

const config: CodegenConfig = {
  schema: {
    [env.VITE_GRAPHQL_URL]: {
      headers: {
        Authorization: `Bearer ${env.VITE_API_TOKEN}`,
      },
    },
  },
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/types/graphql-schema.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          JSON: 'any',
          Date: 'string',
          DateTime: 'string',
        },
        dedupeFragments: true,
      },
    },
  },
};

export default config; 
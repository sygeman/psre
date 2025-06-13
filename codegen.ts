import type { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "./apps/api/src/schema";

const { DIRECTUS_GRAPHQL_URL, DIRECTUS_API_TOKEN } = process.env;

const config: CodegenConfig = {
  generates: {
    // Directus GraphQL Types
    "packages/tools/src/directus.types.ts": {
      schema: `${DIRECTUS_GRAPHQL_URL}?access_token=${DIRECTUS_API_TOKEN}`,
      plugins: ["typescript"],
    },
    "packages/types/src/index.ts": {
      schema: printSchema(schema),
      documents: "packages/*/!(api)/**/!(*.generated).{ts,tsx}",
      plugins: ["typescript"],
    },
    src: {
      schema: printSchema(schema),
      documents: "packages/*/!(api)/**/!(*.generated).{ts,tsx}",
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "~@psre/types",
        extension: ".gql.types.ts",
      },
      plugins: ["typescript-operations"],
    },
  },
};

export default config;

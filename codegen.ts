import type { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "./apps/api2/src/schema";

const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: "packages/**/!(*.generated).{ts,tsx}",
  generates: {
    "packages/types/src/index.ts": {
      plugins: ["typescript"],
    },
    src: {
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

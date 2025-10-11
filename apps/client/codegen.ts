import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "../api/schema.gql",
  documents: "./src/modules/**/!(*.generated).{ts,tsx}",
  generates: {
    "./src/types/index.ts": {
      plugins: ["typescript"],
    },
    src: {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "~@/types",
        extension: ".gql.types.ts",
      },
      plugins: ["typescript-operations"],
    },
  },
}

export default config

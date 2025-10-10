import { Glob } from "bun";
import { printSchema } from "graphql";
import { builder } from "@/lib/pothos";

const glob = new Glob("**/modules/**/*.gql.ts");

for await (const file of glob.scan(".")) {
  await import(file)
}

export const schema = builder.toSchema();

await Bun.write("schema.gql", printSchema(schema));

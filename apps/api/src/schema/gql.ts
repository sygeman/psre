import { Glob } from "bun"
import { printSchema } from "graphql"
import { gqlBuilder } from "@/lib/pothos"

const glob = new Glob("**/modules/**/*.gql.ts")

for await (const file of glob.scan(".")) {
  await import(file)
}

export const schema = gqlBuilder.toSchema()

await Bun.write("schema.gql", printSchema(schema))

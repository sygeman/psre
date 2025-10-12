import SchemaBuilder from "@pothos/core"
import { DateResolver, DateTimeResolver, JSONResolver } from "graphql-scalars"
import type { db } from "./drizzle"
import type { pubsub } from "./pubsub"

export const gqlBuilder = new SchemaBuilder<{
  Context: { pubsub: typeof pubsub; currentAccountId: string; db: typeof db }
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    JSON: {
      Input: unknown
      Output: unknown
    }
    Date: {
      Input: Date
      Output: Date
    }
    DateTime: {
      Output: Date
      Input: Date
    }
  }
}>({})

gqlBuilder.addScalarType("JSON", JSONResolver)
gqlBuilder.addScalarType("Date", DateResolver)
gqlBuilder.addScalarType("DateTime", DateTimeResolver)

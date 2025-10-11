import SchemaBuilder from "@pothos/core"
import { DateResolver, DateTimeResolver, JSONResolver } from "graphql-scalars"
import type { pubsub } from "./pubsub"
import type { db } from "./drizzle"

export const builder = new SchemaBuilder<{
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

builder.addScalarType("JSON", JSONResolver)
builder.addScalarType("Date", DateResolver)
builder.addScalarType("DateTime", DateTimeResolver)

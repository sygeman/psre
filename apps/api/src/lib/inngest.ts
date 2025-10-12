import { EventSchemas, Inngest, InngestMiddleware } from "inngest"
import * as dbSchema from "@/schema/db"
import type { Events } from "@/schema/events"
import { db } from "./drizzle"
import { pubsub } from "./pubsub"

const libContextMiddleware = new InngestMiddleware({
  name: "lib-context",
  init() {
    return {
      onFunctionRun() {
        return {
          transformInput() {
            return {
              ctx: {
                db,
                pubsub,
                dbSchema,
              },
            }
          },
        }
      },
    }
  },
})

export const inngest = new Inngest({
  id: "psre",
  schemas: new EventSchemas().fromRecord<Events>(),
  middleware: [libContextMiddleware],
})

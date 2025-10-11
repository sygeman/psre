import { Inngest, InngestMiddleware } from "inngest"
import * as dbSchema from "@/schema/db"
import { db } from "./drizzle"
import { pubsub } from "./pubsub"

const dbMiddleware = new InngestMiddleware({
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
  middleware: [dbMiddleware],
})

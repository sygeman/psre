import { Inngest, InngestMiddleware } from "inngest";
import { db } from "./drizzle";
import { pubsub } from "./pubsub";
import * as dbSchema from "@/schema/db";

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
                 dbSchema
               }
             }
          }
        };
      },
    };
  },
});

export const inngest = new Inngest({
  id: "psre",
  middleware: [dbMiddleware],
});

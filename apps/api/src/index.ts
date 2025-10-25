import { createServer } from "node:http"
import { AuthDataValidator } from "@telegram-auth/server"
import { useServer } from "graphql-ws/use/ws"
import { createYoga } from "graphql-yoga"
import { WebSocketServer } from "ws"
import { db } from "@/lib/drizzle"
import { inngest } from "@/lib/inngest"
import { pubsub } from "@/lib/pubsub"
import { generateToken } from "@/modules/user/service/generate-token"
import { schema } from "./schema/gql"
import "./inngest"
import { currentAccountIdByToken } from "@/modules/user/service/current-account-id-by-token"

type ConnectionParams = {
  token?: string
}

type Extra = {
  accountId?: string
}

const yogaApp = createYoga<{ extra: Extra }>({
  schema,
  context: (ctx) => {
    return { db, pubsub, inngest, currentAccountId: ctx.extra.accountId }
  },
  graphiql: { subscriptionsProtocol: "WS" },
})

// Get NodeJS Server from Yoga
const httpServer = createServer(async (req, res) => {
  if (req.url === "/api/login" && req.method === "POST") {
    try {
      let body = ""
      req.on("data", (chunk) => {
        body += chunk
      })
      req.on("end", async () => {
        const data = JSON.parse(body)
        const botToken = process.env.TELEGRAM_BOT_TOKEN!
        const validator = new AuthDataValidator({ botToken })
        const userTgData = await validator.validate(
          new Map(Object.entries(data)),
        )
        const telegramId = userTgData.id.toString()
        const token = generateToken()
        await inngest.send({ name: "user/create", data: { telegramId, token } })

        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        })
        res.end(token)
      })
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "Invalid request" }))
    }
  } else {
    yogaApp(req, res)
  }
})

// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yogaApp.graphqlEndpoint,
})

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer<ConnectionParams, Extra>(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onConnect: async (ctx) => {
      // do your auth check on every connect (recommended)
      const accountId = await currentAccountIdByToken(
        ctx.connectionParams?.token,
      )

      console.log("accountId", accountId)

      // returning false from the onConnect callback will close with `4403: Forbidden`;
      // therefore, being synonymous to ctx.extra.socket.close(4403, 'Forbidden');
      if (!accountId) return false

      ctx.extra.accountId = accountId
    },
    onSubscribe: async (ctx, _id, params) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaApp.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params,
        })

      const args = {
        schema,
        operationName: params.operationName,
        document: parse(params.query),
        variableValues: params.variables,
        contextValue: await contextFactory(),
        rootValue: { execute, subscribe },
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
})

await inngest.send({
  name: "global/seed",
  data: { telegramId: "57902065", name: "Sygeman" },
})

process
  .on("SIGTERM", () => {
    console.log("SIGTERM")
    httpServer.close()
  })
  .on("SIGINT", () => {
    console.log("SIGINT")
    httpServer.close()
  })

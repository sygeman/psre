import { connect } from "inngest/connect"
import { inngest } from "./lib/inngest"
import * as inngestFunctions from "./schema/events"

;(async () => {
  const connection = await connect({
    apps: [{ client: inngest, functions: Object.values(inngestFunctions) }],
  })

  console.log("Worker: connected", connection.state)

  await connection.closed
  console.log("Worker: Shut down")
})()

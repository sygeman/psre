import { inngest } from "@/lib/inngest"
import { createChat } from "@/schema/events"

const HandlerName = "region/create" as const

export type RegionCreateHandler = {
  [K in typeof HandlerName]: {
    data?: undefined
  }
}

export const createRegion = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ step, db, dbSchema }) => {
    const { chat } = await step.invoke("create-chat-for-region", {
      function: createChat,
    })

    const regions = await db
      .insert(dbSchema.regions)
      .values({ chatId: chat.id })
      .returning()
    const region = regions[0]

    if (!region) throw "Region not found"

    return { region }
  },
)

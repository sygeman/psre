import { inngest } from "@/lib/inngest"
import { createChat } from "@/schema/events"

export const createRegion = inngest.createFunction(
  { id: "create-region" },
  { event: "region/create" },
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

import { inngest } from "@/lib/inngest"
import { gqlBuilder } from "@/lib/pothos"
import { CHAT_EVENTS } from "../chat.events"
import { SendMessageInput } from "../types/send-message.input"

gqlBuilder.mutationType({
  fields: (t) => ({
    createChatMessage: t.boolean({
      args: {
        input: t.arg({ type: SendMessageInput, required: true }),
      },
      resolve: async (_parent, { input }, { currentAccountId }) => {
        await inngest.send({
          name: CHAT_EVENTS.MESSAGE_CREATED,
          data: { ...input, currentAccountId },
        })

        return true
      },
    }),
  }),
})

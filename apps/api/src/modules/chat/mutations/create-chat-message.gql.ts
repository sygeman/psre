import { gqlBuilder } from "@/lib/pothos"
import { SendMessageInput } from "../types/send-message.input"

gqlBuilder.mutationType({
  fields: (t) => ({
    createChatMessage: t.boolean({
      args: {
        input: t.arg({ type: SendMessageInput, required: true }),
      },
      resolve: async (_parent, { input }, { currentAccountId, inngest }) => {
        await inngest.send({
          name: "chat/create-message",
          data: { ...input, currentAccountId },
        })

        return true
      },
    }),
  }),
})

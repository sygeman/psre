import { builder } from "@/lib/pothos"

builder.subscriptionType({
  fields: (t) => ({
    chatCleanup: t.boolean({
      args: {
        chatId: t.arg.string(),
      },
      subscribe: (_parent, { chatId }, { pubsub }) => {
        return pubsub.subscribe("chatCleanup", chatId)
      },
      resolve: (message) => message,
    }),
  }),
})

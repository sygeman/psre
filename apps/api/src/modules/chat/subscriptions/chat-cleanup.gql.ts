import { gqlBuilder } from "@/lib/pothos"

gqlBuilder.subscriptionType({
  fields: (t) => ({
    cleanupChat: t.boolean({
      args: {
        chatId: t.arg.string(),
      },
      subscribe: (_parent, { chatId }, { pubsub }) => {
        return pubsub.subscribe("cleanupChat", chatId)
      },
      resolve: (message) => message,
    }),
  }),
})

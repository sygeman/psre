import { builder } from "@/lib/pothos"
import { Chat } from "../types/chat.type"

builder.queryType({
  fields: (t) => ({
    chats: t.field({
      type: [Chat],
      resolve: async (_parent, _args, { currentAccountId, db }) => {
        const account = await db.query.accounts.findFirst({
          where: (accounts, { eq }) => eq(accounts.id, currentAccountId),
          columns: {
            id: true,
          },
          with: {
            region: {
              columns: {
                chatId: true,
              },
              with: {
                chat: {
                  with: {
                    messages: {
                      columns: {
                        id: true,
                        content: true,
                        createdAt: true,
                      },
                      limit: 20,
                      orderBy: (messages, { desc }) => [desc(messages.createdAt)],
                      with: {
                        author: {
                          columns: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            alliance: {
              columns: {
                chatId: true,
              },
              with: {
                chat: {
                  with: {
                    messages: {
                      columns: {
                        id: true,
                        content: true,
                        createdAt: true,
                      },
                      limit: 20,
                      orderBy: (messages, { desc }) => [desc(messages.createdAt)],
                      with: {
                        author: {
                          columns: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        if (!account) throw "Account not found"

        const regionChatId = account.region?.chatId
        const regionMessages = account.region?.chat?.messages || []

        const allianceChatId = account.alliance?.chatId
        const allianceMessages = account.alliance?.chat?.messages || []

        if (!regionChatId) throw "regionChatId is null"

        const chats = [
          {
            id: regionChatId,
            type: "region",
            messages: regionMessages.reverse(),
          },
        ]

        if (allianceChatId) {
          chats.push({
            id: allianceChatId,
            type: "alliance",
            messages: allianceMessages.reverse(),
          })
        }

        return chats
      },
    }),
  }),
})

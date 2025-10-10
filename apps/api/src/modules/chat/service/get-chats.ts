import { db } from "@/db";
import { builder } from "@/lib/builder";
import { Chat } from "../types/chat.type";

export const getChats = async ({
  currentAccountId,
}: {
  currentAccountId: string;
}) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => (eq(accounts.id, currentAccountId)),
    columns: {
      id: true
    },
    with: {
      region: {
        columns: {
          chatId: true
        },
        with: {
          chat: {
            with: {
              messages: {
                columns: {
                  id: true,
                  content: true,
                  createdAt: true
                },
                limit: 20,
                orderBy: (messages, { desc }) => [desc(messages.createdAt)],
                with: {
                  author: {
                    columns: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      },
      alliance: {
        columns: {
          chatId: true
        },
        with: {
          chat: {
            with: {
              messages: {
                columns: {
                  id: true,
                  content: true,
                  createdAt: true
                },
                limit: 20,
                orderBy: (messages, { desc }) => [desc(messages.createdAt)],
                with: {
                  author: {
                    columns: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!account) throw 'Account not found';

  const regionChatId = account.region?.chatId;
  const allianceChatId = account.alliance?.chatId;

  if (!regionChatId) throw 'regionChatId is null';

  const chats = [{
    id: regionChatId,
    type: "region",
    messages: account.region?.chat?.messages.reverse()
  }];

  if (allianceChatId) {
    chats.push({
      id: allianceChatId,
      type: "alliance",
      messages: account.alliance?.chat?.messages.reverse()
    })
  }

  return chats;
};

builder.queryType({
  fields: (t) => ({
    chats: t.field({
      type: [Chat],
      resolve: (_parent, _args, { currentAccountId }) =>
        getChats({ currentAccountId }),
    }),
  }),
});

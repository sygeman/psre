import { db } from "@/db";

export const getChats = async ({
  currentAccountId,
}: {
  currentAccountId: string;
}) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => (eq(accounts.id, parseInt(currentAccountId))),
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

  const regionChatId = account.region?.chatId?.toString();
  const allianceChatId = account.alliance?.chatId?.toString();

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

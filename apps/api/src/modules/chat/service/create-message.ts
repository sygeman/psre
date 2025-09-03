import { db } from "@/db";
import { chatMessages as chatMessagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createMessage = async ({
  content, authorId, chatId
}: { content: string, authorId: number, chatId: number }) => {
  const chatMessages = await db.insert(chatMessagesTable).values({
    content,
    authorId,
    chatId
  }).returning();

  const messageId = chatMessages[0]?.id;

  if (!messageId) throw 'Message not found';

  return db.query.chatMessages.findFirst({
    where: eq(chatMessagesTable.id, messageId),
    columns: {
      id: true,
      content: true,
      createdAt: true
    },
    with: {
      author: {
        columns: {
          id: true,
          name: true
        }
      }
    }
  })
};

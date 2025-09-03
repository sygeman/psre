import { chats as chatsTable } from '@/db/schema/chats'
import { db } from "@/db";

export const createChat = async () => {
  const chats = await db.insert(chatsTable).values({ }).returning();
  const chat = chats[0];

  if (!chat) throw 'Chat not found';

  return { chat }
}

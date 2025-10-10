import { inngest } from "@/lib/inngest";
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events";

export const createChat = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.CREATE },
  { event: CHAT_EVENTS.CREATE },
  async ({ db, dbSchema }) => {
    const chats = await db.insert(dbSchema.chats).values({ }).returning();
    const chat = chats[0];

    if (!chat) throw 'Chat not found';

    return { chat };
  }
);

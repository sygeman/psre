import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { eq } from "drizzle-orm";

export const chatCleanup = async ({ chatId }) => {
  return db.delete(chatMessages).where(eq(chatMessages.chatId, chatId));
};

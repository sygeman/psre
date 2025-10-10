import { eq } from 'drizzle-orm';
import { inngest } from "@/lib/inngest";
import { createChat } from '@/modules/chat/events/create-chat';

export const createAlliance = inngest.createFunction(
  { id: "create-alliance" },
  { event: "alliance/create" },
  async ({ event: { data: { regionId, ownerId } }, step, db, dbSchema }) => {
    const { chat } = await step.invoke("create-chat-for-alliance", {
      function: createChat,
    });

    const alliances = await db.insert(dbSchema.alliances).values({
      chatId: chat.id,
      regionId,
      ownerId
    }).returning();
    const alliance = alliances[0];

    if (!alliance) throw 'Alliance not found';

    await db.update(dbSchema.accounts)
      .set({ allianceId: alliance.id })
      .where(eq(dbSchema.accounts.id, ownerId))


    return { alliance };
  }
);

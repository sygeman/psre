import { alliances as alliancesTable } from '@/db/schema/alliances'
import { db } from "@/db";
import { createChat } from '@/modules/chat/service/create-chat';
import { accounts as accountsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const createAlliance = async ({ regionId, ownerId }: { regionId: number, ownerId: number }) => {
  const { chat } = await createChat();

  const alliances = await db.insert(alliancesTable).values({
    chatId: chat.id,
    regionId,
    ownerId
  }).returning();
  const alliance = alliances[0];

  if (!alliance) throw 'Alliance not found';

  await db.update(accountsTable)
    .set({ allianceId: alliance.id })
    .where(eq(accountsTable.id, ownerId))


  return { alliance }
}

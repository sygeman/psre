import { regions as regionsTable } from '@/db/schema/regions'
import { db } from "@/db";
import { createChat } from '@/modules/chat/service/create-chat';

export const createRegion = async () => {
  const { chat } = await createChat();

  const regions = await db.insert(regionsTable).values({ chatId: chat.id }).returning();
  const region = regions[0];

  if (!region) throw 'Region not found';

  return { region }
}

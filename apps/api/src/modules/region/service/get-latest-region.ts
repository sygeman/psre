import { regions as regionsTable } from '@/db/schema/regions'
import { db } from "@/db";
import { desc } from 'drizzle-orm';

export const getLatestRegion = async () => {
  let region = await db.query.regions.findFirst({
    orderBy: [desc(regionsTable.id)],
  })

  if (!region) throw 'Region not found';

  return { region }
}

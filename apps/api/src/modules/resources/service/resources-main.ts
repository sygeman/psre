import { db } from "@/db";

export const resourcesMain = async ({
  currentAccountId,
}: {
  currentAccountId: string;
}) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => (eq(accounts.id, currentAccountId))
  })

  if (!account) return;

  return {
    id: account.id,
    food: account.food,
    wood: account.wood,
    steel: account.steel,
    fuel: account.fuel,
    diamond: account.diamond,
  };
};

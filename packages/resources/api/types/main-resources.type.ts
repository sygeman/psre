import { builder } from "@psre/tools";

export type MainResourcesType = {
  id: string;
  food: string;
  wood: string;
  steel: string;
  fuel: string;
  diamond: string;
};

export const MainResources = builder
  .objectRef<MainResourcesType>("MainResources")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      food: t.exposeString("food"),
      wood: t.exposeString("wood"),
      steel: t.exposeString("steel"),
      fuel: t.exposeString("fuel"),
      diamond: t.exposeString("diamond"),
    }),
  });

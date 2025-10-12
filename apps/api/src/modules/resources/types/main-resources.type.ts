import { gqlBuilder } from "@/lib/pothos"

export type MainResourcesType = {
  id: string
  food: number
  wood: number
  steel: number
  fuel: number
  diamond: number
}

export const MainResources = gqlBuilder.objectRef<MainResourcesType>("MainResources").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    food: t.exposeInt("food"),
    wood: t.exposeInt("wood"),
    steel: t.exposeInt("steel"),
    fuel: t.exposeInt("fuel"),
    diamond: t.exposeInt("diamond"),
  }),
})

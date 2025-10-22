import { gqlBuilder } from "@/lib/pothos"

type Building = {
  id: string
  type: string
  level: number
  collectedAt: Date
  upgradeFinishedAt: Date | null
}

export const Building = gqlBuilder.objectRef<Building>("Building").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
    level: t.exposeInt("level"),
    collectedAt: t.expose("collectedAt", { type: "DateTime" }),
    upgradeFinishedAt: t.expose("upgradeFinishedAt", { type: "DateTime" }),
  }),
})

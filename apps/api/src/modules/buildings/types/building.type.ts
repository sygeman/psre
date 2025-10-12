import { gqlBuilder } from "@/lib/pothos"

type Building = {
  id: string
  type: string
}

export const Building = gqlBuilder.objectRef<Building>("Building").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
  }),
})

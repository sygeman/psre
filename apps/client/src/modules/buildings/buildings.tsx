import { For } from "solid-js"
import { BuildingCard } from "./card"
import { createBuildings } from "./create-buildings"

export const Buildings = () => {
  const { buildings } = createBuildings()

  return (
    <For each={buildings()}>{(building) => <BuildingCard {...building} />}</For>
  )
}

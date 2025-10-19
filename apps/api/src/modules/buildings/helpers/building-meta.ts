import {
  BUILDINGS_META,
  CAP_MULTIPLIER,
  RESOURCES_OUTPUT,
} from "../data/buildings-meta"
import type { BuildingType } from "../types"

export function getBuildingMeta(type: BuildingType, level: number) {
  const meta = BUILDINGS_META[type]
  const resourceOutput = RESOURCES_OUTPUT[level - 1]
  if (!resourceOutput) throw "resourceOutput not found"
  const outputPerHour = resourceOutput[meta.outputIndex]
  if (!outputPerHour) throw "outputPerHour invalid"

  return {
    outputPerHour,
    cap: outputPerHour * CAP_MULTIPLIER,
    resourceType: meta.resourceType,
  }
}

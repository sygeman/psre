import type { BUILDINGS_META } from "../data/buildings-meta"

export type BuildingType = keyof typeof BUILDINGS_META
export type ResourceType =
  (typeof BUILDINGS_META)[keyof typeof BUILDINGS_META]["resourceType"]

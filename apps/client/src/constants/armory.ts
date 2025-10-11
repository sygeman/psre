export const MATERIALS_CONFIG = {
  icon: "🔧",
  name: "Запчасти",
  productionTime: 360, // 6 часов в минутах
  speedUpCost: 200,
} as const

export const WEAPONS_CONFIG = {
  icon: "🎲",
  name: "Случайное оружие",
  productionTime: 720, // 12 часов в минутах
  speedUpCost: 500,
  requiredMaterials: 100,
} as const

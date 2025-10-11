import { RESOURCES } from "./resources"

type SlotSymbol =
  | typeof RESOURCES.FOOD.icon
  | typeof RESOURCES.WOOD.icon
  | typeof RESOURCES.STEEL.icon
  | typeof RESOURCES.FUEL.icon
  | typeof RESOURCES.DIAMOND.icon

type SlotReward = {
  name: string
  range: {
    min: number
    max: number
  }
}

type SlotsConfig = {
  SYMBOLS: SlotSymbol[]
  REWARDS: Record<SlotSymbol, SlotReward>
  CHANCES: {
    REGULAR: number // Шанс на обычные ресурсы
    DIAMOND: number // Шанс на алмазы
  }
  ATTEMPTS: {
    MAX: number
    RESTORE_TIME: number
  }
  ANIMATION: {
    SYMBOL_HEIGHT: number
    SPIN_DURATION: number
    REEL_DELAY: number
  }
}

export const SLOTS_CONFIG: SlotsConfig = {
  // Символы и награды
  SYMBOLS: [
    RESOURCES.FOOD.icon, // 🌾
    RESOURCES.WOOD.icon, // 🪵
    RESOURCES.STEEL.icon, // 🔩
    RESOURCES.FUEL.icon, // 🛢️
    RESOURCES.DIAMOND.icon, // 💎
  ],

  REWARDS: {
    [RESOURCES.FOOD.icon]: {
      name: "еды",
      range: { min: 5000, max: 50000 },
    },
    [RESOURCES.WOOD.icon]: {
      name: "древесины",
      range: { min: 5000, max: 50000 },
    },
    [RESOURCES.STEEL.icon]: {
      name: "стали",
      range: { min: 5000, max: 50000 },
    },
    [RESOURCES.FUEL.icon]: {
      name: "топлива",
      range: { min: 5000, max: 50000 },
    },
    [RESOURCES.DIAMOND.icon]: {
      name: "алмазов",
      range: { min: 100, max: 1000 },
    },
  },

  // Шансы выпадения (в процентах)
  CHANCES: {
    REGULAR: 40, // Шанс на обычные ресурсы
    DIAMOND: 5, // Шанс на алмазы
  },

  // Попытки
  ATTEMPTS: {
    MAX: 1,
    RESTORE_TIME: 150000, // 150 секунд в миллисекундах
  },

  // Анимация
  ANIMATION: {
    SYMBOL_HEIGHT: 96,
    SPIN_DURATION: 2000,
    REEL_DELAY: 200, // Задержка между запуском барабанов
  },
} as const

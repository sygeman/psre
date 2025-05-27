import { RESOURCES } from './resources';

type SlotSymbol = typeof RESOURCES.FOOD.icon | typeof RESOURCES.WOOD.icon | typeof RESOURCES.STEEL.icon | typeof RESOURCES.FUEL.icon | typeof RESOURCES.DIAMOND.icon;

type SlotReward = {
  amount: number;
  name: string;
};

type SlotsConfig = {
  SYMBOLS: SlotSymbol[];
  REWARDS: Record<SlotSymbol, SlotReward>;
  CHANCES: {
    REGULAR: number;  // Шанс на обычные ресурсы
    DIAMOND: number;  // Шанс на алмазы
  };
  ATTEMPTS: {
    MAX: 5;
    RESTORE_TIME: number;
  };
  ANIMATION: {
    SYMBOL_HEIGHT: number;
    SPIN_DURATION: number;
    REEL_DELAY: number;
  };
};

export const SLOTS_CONFIG: SlotsConfig = {
  // Символы и награды
  SYMBOLS: [
    RESOURCES.FOOD.icon,   // 🌾
    RESOURCES.WOOD.icon,   // 🪵
    RESOURCES.STEEL.icon,  // 🔩
    RESOURCES.FUEL.icon,   // 🛢️
    RESOURCES.DIAMOND.icon // 💎
  ],

  REWARDS: {
    [RESOURCES.FOOD.icon]: { amount: 10000, name: 'еды' },
    [RESOURCES.WOOD.icon]: { amount: 10000, name: 'древесины' },
    [RESOURCES.STEEL.icon]: { amount: 10000, name: 'стали' },
    [RESOURCES.FUEL.icon]: { amount: 10000, name: 'топлива' },
    [RESOURCES.DIAMOND.icon]: { amount: 100, name: 'алмазов' }
  },

  // Шансы выпадения (в процентах)
  CHANCES: {
    REGULAR: 20,     // Шанс на обычные ресурсы 
    DIAMOND: 5      // Шанс на алмазы
  },

  // Попытки
  ATTEMPTS: {
    MAX: 5,
    RESTORE_TIME: 30000 // 30 секунд в миллисекундах
  },

  // Анимация
  ANIMATION: {
    SYMBOL_HEIGHT: 96,
    SPIN_DURATION: 2000,
    REEL_DELAY: 200     // Задержка между запуском барабанов
  }
} as const; 
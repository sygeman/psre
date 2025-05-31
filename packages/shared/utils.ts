// Общие утилиты для всех приложений
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU');
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}; 
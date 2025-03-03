import { createSignal } from 'solid-js';

const [isConnected, setIsConnected] = createSignal(true);

const handleOffline = () => setIsConnected(false);
const handleOnline = () => setIsConnected(true);

export const connectionStore = {
  isConnected,

  initialize() {
    // Обработчик для события потери соединения
    window.addEventListener('offline', handleOffline);

    // Обработчик для события восстановления соединения
    window.addEventListener('online', handleOnline);

    // Начальное состояние
    setIsConnected(navigator.onLine);
  },

  cleanup() {
    window.removeEventListener('offline', handleOffline);
    window.removeEventListener('online', handleOnline);
  },
};

import { Show, createMemo } from 'solid-js';
import { websocketStore, WebSocketStatus } from '@/stores/websocket';
import { authStore } from '@/stores/auth';

const ConnectionOverlay = () => {
  // Показываем оверлей только если есть проблемы с соединением
  const shouldShow = createMemo(() => {
    // Не показываем если не авторизован (это нормально)
    if (!authStore.isAuthorized) return false;
    
    // Показываем при проблемных состояниях
    return websocketStore.status === WebSocketStatus.Connecting ||
           websocketStore.status === WebSocketStatus.Reconnecting ||
           websocketStore.status === WebSocketStatus.Error;
  });

  const getStatusInfo = createMemo(() => {
    switch (websocketStore.status) {
      case WebSocketStatus.Connecting:
        return {
          icon: '🔄',
          title: 'Подключение к серверу',
          description: 'Устанавливаем соединение...',
          spinning: true,
        };
      case WebSocketStatus.Reconnecting:
        return {
          icon: '🔄',
          title: 'Переподключение',
          description: 'Восстанавливаем соединение с сервером...',
          spinning: true,
        };
      case WebSocketStatus.Error:
        return {
          icon: '⚠️',
          title: 'Проблемы с соединением',
          description: websocketStore.errorMessage || 'Не удается подключиться к серверу',
          spinning: false,
        };
      default:
        return {
          icon: '🔄',
          title: 'Соединение',
          description: 'Проверяем соединение...',
          spinning: true,
        };
    }
  });

  return (
    <Show when={shouldShow()}>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-8 text-center max-w-md mx-4">
          <div class="flex justify-center mb-4">
            <div 
              class={`text-4xl ${getStatusInfo().spinning ? 'animate-spin' : ''}`}
            >
              {getStatusInfo().icon}
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-white mb-2">
            {getStatusInfo().title}
          </h3>
          
          <p class="text-slate-400 text-sm mb-6 leading-relaxed">
            {getStatusInfo().description}
          </p>

          <Show when={websocketStore.status === WebSocketStatus.Error}>
            <div class="mb-4">
              <div class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 backdrop-blur-sm">
                <p class="text-red-300 text-xs font-mono break-words">
                  {websocketStore.errorMessage}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => websocketStore.connect()}
              class="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
            >
              Попробовать снова
            </button>
          </Show>
        </div>
      </div>
    </Show>
  );
};

export default ConnectionOverlay; 
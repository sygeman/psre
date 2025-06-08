import { Show, createMemo } from 'solid-js';
import { websocketStore, WebSocketStatus } from '@/stores/websocket';

const ConnectionOverlay = () => {
  const shouldShow = createMemo(() => {
    return websocketStore.status === WebSocketStatus.Connecting ||
           websocketStore.status === WebSocketStatus.Reconnecting ||
           websocketStore.status === WebSocketStatus.Error;
  });

  const getStatusInfo = createMemo(() => {
    switch (websocketStore.status) {
      case WebSocketStatus.Connecting:
        return {
          title: 'Подключение к серверу',
          description: 'Устанавливаем соединение...',
        };
      case WebSocketStatus.Reconnecting:
        return {
          title: 'Переподключение',
          description: 'Восстанавливаем соединение с сервером...',
        };
      case WebSocketStatus.Error:
        return {
          title: 'Проблемы с соединением',
          description: websocketStore.errorMessage || 'Не удается подключиться к серверу',
        };
      default:
        return {
          title: 'Соединение',
          description: 'Проверяем соединение...',
        };
    }
  });

  return (
    <Show when={shouldShow()}>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="p-8 text-center max-w-md mx-4">          
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
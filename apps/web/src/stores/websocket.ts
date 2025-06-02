import { createStore } from 'solid-js/store';
import { createEffect, onCleanup } from 'solid-js';
import { authStore } from './auth';
import { WS_BASE_URL, WS_RECONNECT_DELAY } from '@/constants/app';
import { authService } from '@/services/auth';

export enum WebSocketStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Error = 'error',
  Reconnecting = 'reconnecting',
}

interface WebSocketState {
  status: WebSocketStatus;
  errorMessage: string;
}

// Создаем store
const [wsState, setWsState] = createStore<WebSocketState>({
  status: WebSocketStatus.Disconnected,
  errorMessage: '',
});

// Приватные переменные
let ws: WebSocket | null = null;
let isInitializing = false;
let hasConnected = false;
let reconnectTimeout: number | undefined;

// Функция подключения WebSocket
const connect = async (): Promise<boolean> => {
  if (isInitializing) {
    console.log('🚫 Connection already initializing, aborting duplicate attempt');
    return false;
  }
  
  if (ws?.readyState === WebSocket.OPEN || ws?.readyState === WebSocket.CONNECTING) {
    console.log('🔄 WebSocket already connecting/connected, skipping duplicate connection attempt');
    return true;
  }

  isInitializing = true;
  setWsState({
    status: WebSocketStatus.Connecting,
    errorMessage: '',
  });
  console.log('🔄 Starting WebSocket connection process...');

  // Проверяем авторизацию
  if (!authStore.isAuthorized) {
    console.log('❌ Not authorized, cannot connect WebSocket');
    setWsState({
      status: WebSocketStatus.Error,
      errorMessage: 'Необходима авторизация для подключения',
    });
    isInitializing = false;
    return false;
  }

  const authToken = authStore.getAuthToken();
  const userId = authStore.getUserId();

  if (!authToken || !userId) {
    console.log('❌ Missing auth data');
    setWsState({
      status: WebSocketStatus.Error,
      errorMessage: 'Отсутствуют данные авторизации',
    });
    isInitializing = false;
    return false;
  }

  try {
    // Проверяем токен перед подключением через сервис
    console.log('🔍 Checking token via HTTP before WebSocket connection');
    
    const tokenCheckResult = await authService.checkToken(authToken, userId);

    if (!tokenCheckResult.success) {
      console.log('❌ Token is invalid');
      setWsState({
        status: WebSocketStatus.Error,
        errorMessage: `Токен недействителен: ${tokenCheckResult.error || 'неизвестная ошибка'}`,
      });
      isInitializing = false;
      authStore.logout(); // Выходим если токен недействителен
      return false;
    }

    console.log('✅ Token is valid, proceeding with WebSocket connection');
  } catch (error) {
    console.log('❌ Failed to check token:', error);
    setWsState({
      status: WebSocketStatus.Error,
      errorMessage: 'Ошибка при проверке токена: ' + (error instanceof Error ? error.message : 'неизвестная ошибка'),
    });
    isInitializing = false;
    return false;
  }

  const wsUrl = `${WS_BASE_URL}?token=${encodeURIComponent(authToken)}&userId=${encodeURIComponent(userId)}`;
  
  console.log('🚀 Connecting WebSocket with user ID:', userId);

  try {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('✅ WebSocket connection opened successfully');
      setWsState({
        status: WebSocketStatus.Connected,
        errorMessage: '',
      });
      hasConnected = true;
      isInitializing = false;
      
      // Отправляем эхо-сообщение
      const echoMessage = {
        type: 'echo_test',
        message: 'Hello from web client!',
        timestamp: new Date().toISOString(),
        userId: userId
      };
      
      console.log('📤 Sending echo message on connection:', echoMessage);
      ws?.send(JSON.stringify(echoMessage));
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        
        if (messageData.type === 'error') {
          const errorMessage = messageData.message || 'Ошибка авторизации';
          console.log(`❌ WebSocket error: ${errorMessage}`);
          setWsState({
            status: WebSocketStatus.Error,
            errorMessage: errorMessage,
          });
          
          if (errorMessage.includes('токен') || errorMessage.includes('Токен') || 
              errorMessage.includes('авторизации') || errorMessage.includes('Авторизации')) {
            console.log('🗑️ Removing invalid token due to WebSocket error');
            authStore.logout();
          }
        } else if (messageData.type === 'welcome') {
          console.log(`✅ Welcome message received for user ID: ${userId}`);
        } else {
          console.log('📥 WebSocket message received:', messageData);
        }
      } catch {
        console.log('📥 WebSocket raw message:', event.data);
      }
    };

    ws.onclose = (event) => {
      console.log('🔌 WebSocket connection closed', event.code, event.reason);
      isInitializing = false;
      
      if (event.code === 1008) {
        console.log('❌ WebSocket authorization error');
        setWsState({
          status: WebSocketStatus.Error,
          errorMessage: 'Ошибка авторизации WebSocket (код: 1008)',
        });
        authStore.logout();
      } else {
        console.log('🔌 WebSocket connection closed normally');
        
        // Автоматическое переподключение если было соединение
        if (hasConnected && authStore.isAuthorized) {
          setWsState({
            status: WebSocketStatus.Reconnecting,
            errorMessage: '',
          });
          console.log(`🔄 Scheduling reconnection in ${WS_RECONNECT_DELAY / 1000} seconds...`);
          reconnectTimeout = window.setTimeout(() => {
            if (authStore.isAuthorized) {
              connect();
            }
          }, WS_RECONNECT_DELAY);
        } else {
          setWsState({
            status: WebSocketStatus.Disconnected,
            errorMessage: event.reason || 'Соединение закрыто',
          });
        }
      }
    };

    ws.onerror = (error) => {
      console.error('🚨 WebSocket error:', error);
      setWsState({
        status: WebSocketStatus.Error,
        errorMessage: 'Ошибка соединения WebSocket',
      });
      isInitializing = false;
    };

    return true;
  } catch (error) {
    console.error('🚨 Error creating WebSocket connection:', error);
    setWsState({
      status: WebSocketStatus.Error,
      errorMessage: 'Ошибка создания соединения: ' + (error instanceof Error ? error.message : 'неизвестная ошибка'),
    });
    isInitializing = false;
    return false;
  }
};

// Функция отключения
const disconnect = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = undefined;
  }
  
  if (ws) {
    ws.close();
    ws = null;
  }
  
  setWsState({
    status: WebSocketStatus.Disconnected,
    errorMessage: '',
  });
  isInitializing = false;
  hasConnected = false;
  console.log('🔌 WebSocket manually disconnected');
};

// Функция отправки сообщения
const sendMessage = (message: any): boolean => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.warn('⚠️ WebSocket not connected, cannot send message');
    return false;
  }

  try {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    ws.send(messageStr);
    console.log('📤 Message sent:', message);
    return true;
  } catch (error) {
    console.error('❌ Failed to send message:', error);
    return false;
  }
};

// Функция отправки эхо-сообщения
const sendEchoMessage = () => {
  const userId = authStore.getUserId();
  if (!userId) return false;

  const echoMessage = {
    type: 'echo_test',
    message: 'Hello from web client!',
    timestamp: new Date().toISOString(),
    userId: userId
  };

  return sendMessage(echoMessage);
};

// Автоматическое подключение при авторизации
createEffect(() => {
  if (authStore.isAuthorized && wsState.status === WebSocketStatus.Disconnected && !isInitializing) {
    console.log('🔄 Auto-connecting WebSocket after authorization');
    connect();
  } else if (!authStore.isAuthorized && wsState.status !== WebSocketStatus.Disconnected) {
    console.log('🔄 Auto-disconnecting WebSocket after logout');
    disconnect();
  }
});

// Очистка при размонтировании
onCleanup(() => {
  disconnect();
});

export const websocketStore = {
  // Store для доступа к состоянию
  get status() { return wsState.status; },
  get errorMessage() { return wsState.errorMessage; },
  get isConnected() { return wsState.status === WebSocketStatus.Connected; },
  get isConnecting() { return wsState.status === WebSocketStatus.Connecting; },
  get isReconnecting() { return wsState.status === WebSocketStatus.Reconnecting; },
  get isDisconnected() { return wsState.status === WebSocketStatus.Disconnected; },
  get hasError() { return wsState.status === WebSocketStatus.Error; },
  
  // Функции
  connect,
  disconnect,
  sendMessage,
  sendEchoMessage,
}; 
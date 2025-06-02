import { createStore } from 'solid-js/store';
import { createEffect, onCleanup } from 'solid-js';
import { authStore } from './auth';
import { API_BASE_URL, WS_BASE_URL, WS_RECONNECT_DELAY } from '@/constants/app';

export interface WebSocketMessage {
  id: string;
  timestamp: string;
  timestampMs: number;
  type: 'sent' | 'received';
  data: string;
}

interface WebSocketState {
  isConnected: boolean;
  connectionStatus: string;
  messages: WebSocketMessage[];
  connectionError: string;
}

// Создаем store
const [wsState, setWsState] = createStore<WebSocketState>({
  isConnected: false,
  connectionStatus: 'Отключен',
  messages: [],
  connectionError: '',
});

// Приватные переменные
let ws: WebSocket | null = null;
let messageCounter = 0;
let isInitializing = false;
let hasConnected = false;
let reconnectTimeout: number | undefined;

// Функция добавления сообщения в лог
const addMessage = (data: string, type: 'sent' | 'received') => {
  const message: WebSocketMessage = {
    id: `msg-${++messageCounter}`,
    timestamp: new Date().toISOString(),
    timestampMs: Date.now(),
    type,
    data
  };
  
  setWsState('messages', prev => [...prev, message]);
};

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
  console.log('🔄 Starting WebSocket connection process...');

  // Проверяем авторизацию
  if (!authStore.isAuthorized) {
    console.log('❌ Not authorized, cannot connect WebSocket');
    setWsState({
      connectionError: 'Необходима авторизация для подключения',
      connectionStatus: 'Ошибка: нет авторизации',
    });
    isInitializing = false;
    return false;
  }

  const authToken = authStore.getAuthToken();
  const userId = authStore.getUserId();

  if (!authToken || !userId) {
    console.log('❌ Missing auth data');
    setWsState({
      connectionError: 'Отсутствуют данные авторизации',
      connectionStatus: 'Ошибка: нет токена',
    });
    isInitializing = false;
    return false;
  }

  try {
    // Проверяем токен перед подключением
    setWsState('connectionStatus', 'Проверка токена...');
    console.log('🔍 Checking token via HTTP before WebSocket connection');
    
    const tokenCheckResponse = await fetch(`${API_BASE_URL}/auth/telegram/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token: authToken,
        userId: userId 
      }),
    });

    const tokenCheckResult = await tokenCheckResponse.json();

    if (!tokenCheckResult.success) {
      console.log('❌ Token is invalid');
      setWsState({
        connectionError: `Токен недействителен: ${tokenCheckResult.error}`,
        connectionStatus: 'Ошибка: недействительный токен',
      });
      isInitializing = false;
      authStore.logout(); // Выходим если токен недействителен
      return false;
    }

    console.log('✅ Token is valid, proceeding with WebSocket connection');
  } catch (error) {
    console.log('❌ Failed to check token:', error);
    setWsState({
      connectionError: 'Ошибка при проверке токена',
      connectionStatus: 'Ошибка: проверка токена',
    });
    isInitializing = false;
    return false;
  }

  const wsUrl = `${WS_BASE_URL}?token=${encodeURIComponent(authToken)}&userId=${encodeURIComponent(userId)}`;
  
  console.log('🚀 Connecting WebSocket with user ID:', userId);

  try {
    setWsState({
      connectionStatus: 'Подключение...',
      connectionError: '',
    });
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('✅ WebSocket connection opened successfully');
      setWsState({
        isConnected: true,
        connectionStatus: 'Подключен',
        connectionError: '',
      });
      hasConnected = true;
      isInitializing = false;
      addMessage('Подключение установлено', 'received');
      
      // Отправляем эхо-сообщение
      const echoMessage = {
        type: 'echo_test',
        message: 'Hello from web client!',
        timestamp: new Date().toISOString(),
        userId: userId
      };
      
      console.log('📤 Sending echo message on connection:', echoMessage);
      ws?.send(JSON.stringify(echoMessage));
      addMessage(`Отправлено эхо сообщение: ${JSON.stringify(echoMessage, null, 2)}`, 'sent');
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        
        if (messageData.type === 'error') {
          const errorMessage = messageData.message || 'Ошибка авторизации';
          setWsState({
            connectionError: errorMessage,
            connectionStatus: 'Ошибка авторизации',
          });
          addMessage(`Ошибка: ${errorMessage}`, 'received');
          
          if (errorMessage.includes('токен') || errorMessage.includes('Токен') || 
              errorMessage.includes('авторизации') || errorMessage.includes('Авторизации')) {
            console.log('🗑️ Removing invalid token due to WebSocket error');
            authStore.logout();
          }
        } else if (messageData.type === 'welcome') {
          addMessage(`Добро пожаловать! (ID: ${userId})`, 'received');
        } else {
          addMessage(JSON.stringify(messageData, null, 2), 'received');
        }
      } catch {
        addMessage(event.data, 'received');
      }
    };

    ws.onclose = (event) => {
      console.log('🔌 WebSocket connection closed', event.code, event.reason);
      setWsState('isConnected', false);
      isInitializing = false;
      
      if (event.code === 1008) {
        setWsState({
          connectionError: 'Ошибка авторизации WebSocket',
          connectionStatus: 'Ошибка: авторизация WebSocket',
        });
        addMessage('Ошибка авторизации WebSocket', 'received');
        authStore.logout();
      } else {
        setWsState('connectionStatus', 'Отключен');
        addMessage('Соединение закрыто', 'received');
        
        // Автоматическое переподключение если было соединение
        if (hasConnected && authStore.isAuthorized) {
          console.log(`🔄 Scheduling reconnection in ${WS_RECONNECT_DELAY / 1000} seconds...`);
          reconnectTimeout = window.setTimeout(() => {
            if (authStore.isAuthorized) {
              connect();
            }
          }, WS_RECONNECT_DELAY);
        }
      }
    };

    ws.onerror = (error) => {
      console.error('🚨 WebSocket error:', error);
      setWsState({
        connectionError: 'Ошибка соединения WebSocket',
        connectionStatus: 'Ошибка соединения',
      });
      isInitializing = false;
    };

    return true;
  } catch (error) {
    console.error('🚨 Error creating WebSocket connection:', error);
    setWsState({
      connectionError: 'Ошибка создания соединения WebSocket',
      connectionStatus: 'Ошибка создания соединения',
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
    isConnected: false,
    connectionStatus: 'Отключен',
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
    addMessage(messageStr, 'sent');
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

// Функция очистки сообщений
const clearMessages = () => {
  setWsState('messages', []);
  messageCounter = 0;
};

// Автоматическое подключение при авторизации
createEffect(() => {
  if (authStore.isAuthorized && !wsState.isConnected && !isInitializing) {
    console.log('🔄 Auto-connecting WebSocket after authorization');
    connect();
  } else if (!authStore.isAuthorized && wsState.isConnected) {
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
  get isConnected() { return wsState.isConnected; },
  get connectionStatus() { return wsState.connectionStatus; },
  get messages() { return wsState.messages; },
  get connectionError() { return wsState.connectionError; },
  
  // Функции
  connect,
  disconnect,
  sendMessage,
  sendEchoMessage,
  clearMessages,
}; 
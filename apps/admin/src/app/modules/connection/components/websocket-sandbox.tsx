'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WebSocketMessage {
  id: string;
  timestamp: string;
  timestampMs: number;
  type: 'sent' | 'received';
  data: string;
}

export function WebSocketSandbox() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('Отключен');
  const [authError, setAuthError] = useState<string>('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const messageCounterRef = useRef(0);

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Получаем токен из localStorage
    const storedAuth = localStorage.getItem('connection_telegram_auth');
    if (!storedAuth) {
      setAuthError('Токен авторизации не найден. Пожалуйста, авторизуйтесь заново.');
      setConnectionStatus('Ошибка: нет токена');
      return;
    }

    let authToken;
    try {
      const { user, timestamp } = JSON.parse(storedAuth);
      
      console.log('WebSocket connection debug:');
      console.log('- Stored auth:', storedAuth);
      console.log('- Parsed user:', user);
      console.log('- Timestamp:', timestamp);
      console.log('- Token from user:', user.authToken);
      
      // Проверяем, что токен не истек (24 часа)
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        setAuthError('Токен авторизации истек. Пожалуйста, авторизуйтесь заново.');
        setConnectionStatus('Ошибка: токен истек');
        localStorage.removeItem('connection_telegram_auth');
        return;
      }
      
      authToken = user.authToken;
      console.log('- Final token to use:', authToken);
    } catch {
      setAuthError('Ошибка при чтении токена. Пожалуйста, авторизуйтесь заново.');
      setConnectionStatus('Ошибка: некорректный токен');
      localStorage.removeItem('connection_telegram_auth');
      return;
    }

    // Формируем URL с токеном
    const WS_URL = `ws://localhost:4000/ws?token=${encodeURIComponent(authToken)}`;
    
    console.log('- WebSocket URL:', WS_URL);

    try {
      setConnectionStatus('Подключение...');
      setAuthError('');
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('Подключен');
        addMessage('Подключение установлено', 'received');
      };

      wsRef.current.onmessage = (event) => {
        let messageData;
        try {
          // Пытаемся распарсить JSON
          messageData = JSON.parse(event.data);
          
          // Проверяем тип сообщения
          if (messageData.type === 'error') {
            setAuthError(messageData.message || 'Ошибка авторизации');
            setConnectionStatus('Ошибка авторизации');
            addMessage(`Ошибка: ${messageData.message}`, 'received');
          } else if (messageData.type === 'welcome') {
            addMessage(`Добро пожаловать, ${messageData.user?.username}!`, 'received');
          } else {
            addMessage(JSON.stringify(messageData, null, 2), 'received');
          }
        } catch {
          // Если не JSON, показываем как есть
          addMessage(event.data, 'received');
        }
      };

      wsRef.current.onclose = (event) => {
        setIsConnected(false);
        
        if (event.code === 1008) {
          // Код 1008 означает ошибку авторизации
          setAuthError('Ошибка авторизации. Токен недействителен или истек.');
          setConnectionStatus('Ошибка авторизации');
          addMessage(`Соединение закрыто: ${event.reason}`, 'received');
        } else {
          setConnectionStatus('Отключен');
          addMessage('Соединение закрыто', 'received');
        }
      };

      wsRef.current.onerror = () => {
        setConnectionStatus('Ошибка подключения');
        addMessage('Ошибка подключения к серверу', 'received');
      };
    } catch (error) {
      setConnectionStatus('Ошибка подключения');
      addMessage(`Ошибка подключения: ${error}`, 'received');
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const addMessage = (data: string, type: 'sent' | 'received') => {
    messageCounterRef.current += 1;
    const timestamp = Date.now();
    const newMessage: WebSocketMessage = {
      id: `${timestamp}-${messageCounterRef.current}`,
      timestamp: new Date(timestamp).toLocaleTimeString(),
      timestampMs: timestamp,
      type,
      data
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    // Автоматическое подключение при загрузке компонента
    connect();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 className="text-3xl font-bold">Connection</h1>
      </div>

      <Card className="flex-shrink-0">
        <CardHeader>
          <CardTitle>Подключение к серверу</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {authError && (
            <div className="px-3 py-2 rounded-md bg-red-100 text-red-800 text-sm">
              {authError}
            </div>
          )}
          
          <div className={`px-3 py-2 rounded-md text-center text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {connectionStatus}
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={connect} 
              disabled={isConnected}
              variant="outline"
              className="flex-1"
            >
              {isConnected ? '✓ Подключен' : 'Переподключиться'}
            </Button>
            <Button 
              onClick={disconnect} 
              disabled={!isConnected}
              variant="outline"
              className="flex-1"
            >
              Отключиться
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 flex-shrink-0">
          <CardTitle>История сообщений</CardTitle>
          <Button 
            onClick={clearMessages} 
            variant="outline" 
            size="sm"
          >
            Очистить
          </Button>
        </CardHeader>
        <CardContent className="h-full overflow-hidden p-6">
          <div className="space-y-2 h-full overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Сообщений пока нет
              </p>
            ) : (
              messages
                .sort((a, b) => b.timestampMs - a.timestampMs)
                .map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.type === 'sent'
                        ? 'bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500'
                        : 'bg-muted border-l-4 border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span className="font-medium">
                        {message.type === 'sent' ? '→ Отправлено' : '← Получено'}
                      </span>
                      <span>{message.timestamp}</span>
                    </div>
                    <div className="text-sm font-mono break-all">
                      {message.data}
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
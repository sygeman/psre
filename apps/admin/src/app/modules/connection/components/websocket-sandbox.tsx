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
  
  const wsRef = useRef<WebSocket | null>(null);
  const messageCounterRef = useRef(0);
  const WS_URL = 'ws://localhost:4000/ws';

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setConnectionStatus('Подключение...');
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('Подключен');
        addMessage('Подключение установлено', 'received');
      };

      wsRef.current.onmessage = (event) => {
        addMessage(event.data, 'received');
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        setConnectionStatus('Отключен');
        addMessage('Соединение закрыто', 'received');
      };

      wsRef.current.onerror = (error) => {
        setConnectionStatus('Ошибка подключения');
        addMessage(`Ошибка: ${error}`, 'received');
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
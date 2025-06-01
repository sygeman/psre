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

interface WebSocketSandboxProps {
  onAuthReset?: () => void;
}

export function WebSocketSandbox({ onAuthReset }: WebSocketSandboxProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('Отключен');
  const [authError, setAuthError] = useState<string>('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const messageCounterRef = useRef(0);
  const isInitializingRef = useRef(false);
  const hasConnectedRef = useRef(false);

  const connect = async () => {
    if (isInitializingRef.current) {
      console.log('🚫 Connection already initializing, aborting duplicate attempt');
      return;
    }
    
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) {
      console.log('🔄 WebSocket already connecting/connected, skipping duplicate connection attempt');
      return;
    }

    isInitializingRef.current = true;
    console.log('🔄 Starting WebSocket connection process...');

    const storedAuth = localStorage.getItem('connection_telegram_auth');
    
    if (!storedAuth) {
      setAuthError('Токен авторизации не найден. Пожалуйста, авторизуйтесь заново.');
      setConnectionStatus('Ошибка: нет токена');
      isInitializingRef.current = false;
      
      if (onAuthReset) {
        onAuthReset();
      }
      return;
    }

    let authToken;
    let userId;
    try {
      const { user, timestamp } = JSON.parse(storedAuth);
      
      console.log('WebSocket connection debug:');
      console.log('- Stored auth:', storedAuth);
      console.log('- Parsed user:', user);
      console.log('- Timestamp:', timestamp);
      console.log('- Token from user:', user.authToken);
      console.log('- User ID from user:', user.userId);
      
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        setAuthError('Токен авторизации истек. Пожалуйста, авторизуйтесь заново.');
        setConnectionStatus('Ошибка: токен истек');
        localStorage.removeItem('connection_telegram_auth');
        isInitializingRef.current = false;
        
        if (onAuthReset) {
          onAuthReset();
        }
        return;
      }
      
      authToken = user.authToken;
      userId = user.userId;
      console.log('- Final token to use:', authToken);
      console.log('- Final user ID to use:', userId);
    } catch {
      setAuthError('Ошибка при чтении токена. Пожалуйста, авторизуйтесь заново.');
      setConnectionStatus('Ошибка: некорректный токен');
      localStorage.removeItem('connection_telegram_auth');
      isInitializingRef.current = false;
      
      if (onAuthReset) {
        onAuthReset();
      }
      return;
    }

    try {
      setConnectionStatus('Проверка токена...');
      console.log('🔍 Checking token via HTTP before WebSocket connection');
      console.log('🆔 User ID for this session:', userId);
      
      const tokenCheckResponse = await fetch('http://localhost:4000/api/auth/telegram/check', {
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
      console.log('Token check result:', tokenCheckResult);

      if (!tokenCheckResult.success) {
        console.log('❌ Token is invalid, removing from localStorage');
        setAuthError(`Токен недействителен: ${tokenCheckResult.error}`);
        setConnectionStatus('Ошибка: недействительный токен');
        localStorage.removeItem('connection_telegram_auth');
        isInitializingRef.current = false;
        
        if (onAuthReset) {
          onAuthReset();
        }
        return;
      }

      console.log('✅ Token is valid, proceeding with WebSocket connection');
      console.log('👤 Verified user ID:', userId);
    } catch (error) {
      console.log('❌ Failed to check token:', error);
      setAuthError('Ошибка при проверке токена');
      setConnectionStatus('Ошибка: проверка токена');
      isInitializingRef.current = false;
      return;
    }

    const WS_URL = `ws://localhost:4000/ws?token=${encodeURIComponent(authToken)}&userId=${encodeURIComponent(userId)}`;
    
    console.log('- WebSocket URL:', WS_URL);
    console.log('🚀 Connecting with user ID:', userId);

    try {
      setConnectionStatus('Подключение...');
      setAuthError('');
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connection opened successfully');
        setIsConnected(true);
        setConnectionStatus('Подключен');
        hasConnectedRef.current = true;
        isInitializingRef.current = false;
        addMessage('Подключение установлено', 'received');
        
        const echoMessage = {
          type: 'echo_test',
          message: 'Hello from client!',
          timestamp: new Date().toISOString(),
          userId: userId
        };
        
        console.log('📤 Sending echo message on connection:', echoMessage);
        wsRef.current?.send(JSON.stringify(echoMessage));
        addMessage(`Отправлено эхо сообщение: ${JSON.stringify(echoMessage, null, 2)}`, 'sent');
      };

      wsRef.current.onmessage = (event) => {
        let messageData;
        try {
          messageData = JSON.parse(event.data);
          
          if (messageData.type === 'error') {
            const errorMessage = messageData.message || 'Ошибка авторизации';
            setAuthError(errorMessage);
            setConnectionStatus('Ошибка авторизации');
            addMessage(`Ошибка: ${errorMessage}`, 'received');
            
            if (errorMessage.includes('токен') || errorMessage.includes('Токен') || 
                errorMessage.includes('авторизации') || errorMessage.includes('Авторизации')) {
              console.log('🗑️ Removing invalid token from localStorage');
              localStorage.removeItem('connection_telegram_auth');
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

      wsRef.current.onclose = (event) => {
        console.log('🔌 WebSocket connection closed');
        setIsConnected(false);
        isInitializingRef.current = false;
        
        if (event.code === 1008) {
          const reason = event.reason || 'Ошибка авторизации';
          setAuthError(`Ошибка авторизации: ${reason}`);
          setConnectionStatus('Ошибка авторизации');
          addMessage(`Соединение закрыто: ${reason}`, 'received');
          
          console.log('🗑️ Removing invalid token from localStorage (close code 1008)');
          localStorage.removeItem('connection_telegram_auth');
        } else {
          setConnectionStatus('Отключен');
          addMessage('Соединение закрыто', 'received');
        }
      };

      wsRef.current.onerror = () => {
        console.log('❌ WebSocket connection error');
        setConnectionStatus('Ошибка подключения');
        addMessage('Ошибка подключения к серверу', 'received');
        isInitializingRef.current = false;
      };
    } catch (error) {
      console.log('❌ WebSocket creation failed:', error);
      setConnectionStatus('Ошибка подключения');
      addMessage(`Ошибка подключения: ${error}`, 'received');
      isInitializingRef.current = false;
    }
  };

  const disconnect = () => {
    console.log('🔌 Manual disconnect requested');
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    isInitializingRef.current = false;
    hasConnectedRef.current = false;
  };

  const sendEchoMessage = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('❌ WebSocket not connected, cannot send message');
      addMessage('Ошибка: WebSocket не подключен', 'received');
      return;
    }

    const echoMessage = {
      type: 'manual_echo',
      message: `Test message at ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString(),
      random: Math.random().toString(36).substring(7)
    };

    console.log('📤 Sending manual echo message:', echoMessage);
    wsRef.current.send(JSON.stringify(echoMessage));
    addMessage(`Отправлено: ${JSON.stringify(echoMessage, null, 2)}`, 'sent');
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
    if (hasConnectedRef.current || isInitializingRef.current) {
      console.log('🔄 Skipping connection - already initialized or connecting');
      return;
    }

    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      console.log('🔌 Initializing WebSocket connection on component mount');
      connect();
    } else {
      console.log('🔄 WebSocket already exists on component mount, skipping connection');
    }
    
    return () => {
      console.log('🧹 Cleaning up WebSocket connection on component unmount');
      if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
        wsRef.current.close();
        wsRef.current = null;
      }
      isInitializingRef.current = false;
      hasConnectedRef.current = false;
    };
  }, []);

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col p-6 space-y-6">
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
            <Button 
              onClick={sendEchoMessage} 
              disabled={!isConnected}
              variant="outline"
              className="flex-1"
            >
              📤 Эхо
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
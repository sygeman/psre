'use client';

import { AdminLayout } from "@/components/admin-layout";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const WebSocketSandbox = dynamic(() => import('./components/websocket-sandbox').then(mod => ({ default: mod.WebSocketSandbox })), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center">Загрузка sandbox...</div>
});

export default function ConnectionPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botUsername, setBotUsername] = useState('');
  const [userInfo, setUserInfo] = useState<{ telegramId: number; username: string; authToken: string } | null>(null);

  useEffect(() => {
    // Проверяем авторизацию из localStorage при загрузке
    const storedAuth = localStorage.getItem('connection_telegram_auth');
    if (storedAuth) {
      const { user, timestamp } = JSON.parse(storedAuth);
      // Сессия действительна 24 часа
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthorized(true);
        setUserInfo(user);
      } else {
        localStorage.removeItem('connection_telegram_auth');
      }
    }

    // Получаем информацию о боте
    fetchBotInfo();
  }, []);

  const fetchBotInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/telegram/info');
      const data = await response.json();
      if (data.success && data.botUsername) {
        setBotUsername(data.botUsername);
      }
    } catch (error) {
      console.error('Ошибка получения информации о боте:', error);
    }
  };

  const verifyCode = async () => {
    if (!authCode.trim()) {
      setAuthError('Введите код авторизации');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/telegram/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: authCode.trim() })
      });

      const data = await response.json();

      if (data.success) {
        const authInfo = {
          user: data.user,
          timestamp: Date.now()
        };
        localStorage.setItem('connection_telegram_auth', JSON.stringify(authInfo));
        setIsAuthorized(true);
        setUserInfo(data.user);
      } else {
        setAuthError(data.error || 'Неверный код авторизации');
      }
    } catch {
      setAuthError('Ошибка соединения с сервером');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('connection_telegram_auth');
    setIsAuthorized(false);
    setAuthCode('');
    setUserInfo(null);
    setAuthError('');
  };

  if (!isAuthorized) {
    return (
      <AdminLayout>
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Авторизация через Telegram</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Для доступа к модулю &ldquo;Соединение&rdquo; получите код авторизации в Telegram боте.
              </p>

              {botUsername ? (
                <div className="space-y-3">
                  <Button 
                    onClick={() => window.open(`https://t.me/${botUsername}`, '_blank')}
                    className="w-full"
                  >
                    🚀 Открыть бота @{botUsername}
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Отправьте боту команду /start для получения кода
                  </div>
                </div>
              ) : (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                  Telegram бот не настроен
                </div>
              )}

              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="code">Код авторизации из Telegram</Label>
                    <Input
                      id="code"
                      type="text"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      placeholder="Введите 6-значный код"
                      maxLength={6}
                      required
                    />
                  </div>
                  <Button 
                    onClick={verifyCode} 
                    className="w-full" 
                    disabled={isLoading || !authCode.trim()}
                  >
                    {isLoading ? 'Проверка...' : '✅ Войти'}
                  </Button>
                </div>
              </div>

              {authError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {authError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Модуль соединения</h2>
            {userInfo && (
              <p className="text-sm text-muted-foreground">
                Авторизован как: @{userInfo.username} (ID: {userInfo.telegramId})
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Выйти из модуля
          </Button>
        </div>
        <WebSocketSandbox />
      </div>
    </AdminLayout>
  );
} 
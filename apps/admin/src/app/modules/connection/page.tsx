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
  const [authToken, setAuthToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState('');
  const [userInfo, setUserInfo] = useState<{ telegramId: number; username: string } | null>(null);

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
  }, []);

  const requestTelegramAuth = async () => {
    setIsLoading(true);
    setAuthError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/telegram/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setTelegramUrl(data.telegramUrl);
      } else {
        setAuthError(data.error || 'Ошибка при запросе авторизации');
      }
    } catch {
      setAuthError('Ошибка соединения с сервером');
    }

    setIsLoading(false);
  };

  const verifyToken = async () => {
    if (!authToken.trim()) {
      setAuthError('Введите токен авторизации');
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
        body: JSON.stringify({ token: authToken.trim() })
      });

      const data = await response.json();

      if (data.success) {
        const authInfo = {
          token: authToken.trim(),
          user: data.user,
          timestamp: Date.now()
        };
        localStorage.setItem('connection_telegram_auth', JSON.stringify(authInfo));
        setIsAuthorized(true);
        setUserInfo(data.user);
      } else {
        setAuthError(data.error || 'Неверный токен авторизации');
      }
    } catch {
      setAuthError('Ошибка соединения с сервером');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('connection_telegram_auth');
    setIsAuthorized(false);
    setAuthToken('');
    setTelegramUrl('');
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
              {!telegramUrl ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Для доступа к модулю &ldquo;Соединение&rdquo; требуется авторизация через Telegram бота.
                  </p>
                  <Button 
                    onClick={requestTelegramAuth} 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Генерация ссылки...' : '📱 Авторизоваться через Telegram'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      1. Перейдите по ссылке для авторизации в Telegram:
                    </p>
                    <div className="p-3 bg-muted rounded-lg">
                      <a 
                        href={telegramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all text-sm"
                      >
                        {telegramUrl}
                      </a>
                    </div>
                    <Button 
                      onClick={() => window.open(telegramUrl, '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      🚀 Открыть Telegram
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      2. После авторизации в боте, введите полученный токен:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="token">Токен авторизации</Label>
                        <Input
                          id="token"
                          type="text"
                          value={authToken}
                          onChange={(e) => setAuthToken(e.target.value)}
                          placeholder="Вставьте токен из Telegram"
                          required
                        />
                      </div>
                      <Button 
                        onClick={verifyToken} 
                        className="w-full" 
                        disabled={isLoading || !authToken.trim()}
                      >
                        {isLoading ? 'Проверка...' : 'Подтвердить токен'}
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button 
                      onClick={() => {
                        setTelegramUrl('');
                        setAuthToken('');
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      ← Запросить новую ссылку
                    </Button>
                  </div>
                </>
              )}

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
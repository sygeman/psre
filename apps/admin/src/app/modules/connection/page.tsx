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
  const [authCode, setAuthCode] = useState('');
  const [botUsername, setBotUsername] = useState('');
  const [userInfo, setUserInfo] = useState<{ telegramId: number; username: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const requestAuthCode = async () => {
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
        setAuthCode(data.authCode);
        setBotUsername(data.botUsername);
      } else {
        setAuthError(data.error || 'Ошибка при запросе кода авторизации');
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

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(authCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Убираем уведомление через 2 секунды
    } catch {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = authCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('connection_telegram_auth');
    setIsAuthorized(false);
    setAuthToken('');
    setAuthCode('');
    setBotUsername('');
    setUserInfo(null);
    setAuthError('');
    setCopySuccess(false);
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
              {!authCode ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Для доступа к модулю &ldquo;Соединение&rdquo; требуется авторизация через Telegram бота.
                  </p>
                  <Button 
                    onClick={requestAuthCode} 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Генерация кода...' : '🔐 Получить код авторизации'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      1. Откройте бота @{botUsername} в Telegram
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2. Отправьте боту следующий код:
                    </p>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg text-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                      <div className="mb-3">
                        <div className="text-sm text-muted-foreground mb-2">Код авторизации:</div>
                        <div className="text-4xl font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-blue-400 select-all">
                          {authCode.slice(0, 3)}<span className="text-slate-400 mx-1">-</span>{authCode.slice(3, 6)}
                        </div>
                      </div>
                      <Button 
                        onClick={copyCodeToClipboard}
                        variant={copySuccess ? "default" : "outline"}
                        size="sm"
                        className="mt-2"
                        disabled={copySuccess}
                      >
                        {copySuccess ? '✅ Скопировано!' : '📋 Скопировать код'}
                      </Button>
                    </div>
                    <Button 
                      onClick={() => window.open(`https://t.me/${botUsername}`, '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      🚀 Открыть бота в Telegram
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      3. После отправки кода боту, введите полученный токен:
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
                        setAuthCode('');
                        setBotUsername('');
                        setAuthToken('');
                        setCopySuccess(false);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      ← Получить новый код
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
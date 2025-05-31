'use client';

import { AdminLayout } from "@/components/admin-layout";
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const WebSocketSandbox = dynamic(() => import('./components/websocket-sandbox').then(mod => ({ default: mod.WebSocketSandbox })), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center">Загрузка sandbox...</div>
});

export default function ConnectionPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authCode, setAuthCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [userInfo, setUserInfo] = useState<{ telegramId: number; username: string; authToken: string } | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    
    try {
      // Проверяем авторизацию из localStorage при загрузке
      const storedAuth = localStorage.getItem('connection_telegram_auth');
      
      if (!storedAuth) {
        console.log('🔍 No stored auth found');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const { user, timestamp } = JSON.parse(storedAuth);
      
      // Сессия действительна 24 часа
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        console.log('🔍 Stored auth expired');
        localStorage.removeItem('connection_telegram_auth');
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Проверяем токен через HTTP API
      console.log('🔍 Checking stored token via HTTP');
      const response = await fetch('http://localhost:4000/api/auth/telegram/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: user.authToken,
          userId: user.telegramId 
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Stored token is valid');
        console.log('📋 User ID:', user.telegramId);
        setIsAuthorized(true);
        setUserInfo(user);
      } else {
        console.log('❌ Stored token is invalid, removing');
        localStorage.removeItem('connection_telegram_auth');
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log('❌ Error checking auth status:', error);
      localStorage.removeItem('connection_telegram_auth');
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!authCode.trim()) {
      setAuthError('Введите код авторизации');
      return;
    }

    setIsVerifying(true);
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
        
        // Сохраняем авторизационные данные
        localStorage.setItem('connection_telegram_auth', JSON.stringify(authInfo));
        
        console.log('💾 Saved auth data for user ID:', data.user.telegramId);
        
        setIsAuthorized(true);
        setUserInfo(data.user);
      } else {
        setAuthError(data.error || 'Неверный код авторизации');
      }
    } catch {
      setAuthError('Ошибка соединения с сервером');
    }

    setIsVerifying(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('connection_telegram_auth');
    setIsAuthorized(false);
    setAuthCode('');
    setUserInfo(null);
    setAuthError('');
    console.log('🗑️ Cleared auth data');
  };

  const handleAuthReset = () => {
    console.log('🔄 Auth reset requested from WebSocket component');
    handleLogout();
  };

  // Показываем лоадер при загрузке
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-muted-foreground">Проверка авторизации...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

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

                <div className="space-y-3">
                  <Button 
                    onClick={() => window.open(`https://t.me/sgmn_dev_bot`, '_blank')}
                    className="w-full"
                  >
                    🚀 Открыть бота @sgmn_dev_bot
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Отправьте боту команду /start для получения кода
                  </div>
                </div>
          

              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="code">Код авторизации из Telegram</Label>
                    <InputOTP
                      maxLength={6}
                      value={authCode}
                      onChange={(value) => setAuthCode(value)}
                      className="w-full"
                    >
                      <InputOTPGroup className="w-full justify-center">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button 
                    onClick={verifyCode} 
                    className="w-full" 
                    disabled={isVerifying || !authCode.trim()}
                  >
                    {isVerifying ? 'Проверка...' : '✅ Войти'}
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
        <WebSocketSandbox 
          key={userInfo?.telegramId} 
          onAuthReset={handleAuthReset} 
        />
      </div>
    </AdminLayout>
  );
} 
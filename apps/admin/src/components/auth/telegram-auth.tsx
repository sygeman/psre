'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

interface User {
  telegramId: number;
  username: string;
  authToken: string;
}

interface TelegramAuthProps {
  onSuccess: (user: User) => void;
}

export function TelegramAuth({ onSuccess }: TelegramAuthProps) {
  const [step, setStep] = useState<'initial' | 'code'>('initial');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [botUsername, setBotUsername] = useState('');

  const handleRequestCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/telegram/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBotUsername(result.botUsername);
        setStep('code');
      } else {
        setError(result.error || 'Ошибка при запросе кода');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      setError('Введите код авторизации');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/telegram/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', result.user.authToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        onSuccess(result.user);
      } else {
        setError(result.error || 'Неверный код авторизации');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const openTelegramBot = () => {
    if (botUsername) {
      window.open(`https://t.me/${botUsername}`, '_blank');
    }
  };

  if (step === 'initial') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
            <CardDescription>
              Для доступа к системе используется авторизация через Telegram
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            
            <Button 
              onClick={handleRequestCode} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Проверка...' : '🔐 Авторизоваться через Telegram'}
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              При нажатии вы получите инструкции для получения кода авторизации
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Введите код</CardTitle>
          <CardDescription>
            Откройте Telegram бота и получите код авторизации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={openTelegramBot}
              variant="outline"
              className="mb-4"
            >
              📱 Открыть Telegram бота
            </Button>
            <div className="text-sm text-gray-600 mb-4">
              Отправьте команду <code className="bg-gray-100 px-1 rounded">/start</code> боту
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="code">Код авторизации</Label>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              onComplete={(value) => {
                if (value.length === 6) {
                  handleVerifyCode();
                }
              }}
              className="w-full mt-2"
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
            {loading && (
              <div className="text-center text-sm text-muted-foreground">
                Проверка кода...
              </div>
            )}
          </div>

          <Button 
            onClick={() => setStep('initial')}
            variant="ghost"
            className="w-full"
          >
            Назад
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
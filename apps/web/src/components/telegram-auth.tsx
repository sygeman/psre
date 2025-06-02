import { createSignal, Show } from 'solid-js';
import { authStore } from '@/stores/auth';

const TelegramAuth = () => {
  const [authCode, setAuthCode] = createSignal('');
  const [isVerifying, setIsVerifying] = createSignal(false);
  const [authError, setAuthError] = createSignal('');

  const handleVerifyCode = async () => {
    if (!authCode().trim()) {
      return;
    }

    setIsVerifying(true);
    setAuthError('');
    
    const result = await authStore.verifyCode(authCode());
    
    if (result.success) {
      setAuthCode('');
      setAuthError('');
    } else {
      setAuthError(result.error || 'Произошла ошибка');
    }
    
    setIsVerifying(false);
  };

  const handleCodeInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/[^0-9]/g, '').slice(0, 8);
    setAuthCode(value);
    target.value = value;
    
    // Очищаем ошибку при вводе
    if (authError()) {
      setAuthError('');
    }
    
    // Автоматическая верификация при вводе 8 цифр
    if (value.length === 8) {
      handleVerifyCode();
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            Авторизация через Telegram
          </h1>
          <p class="text-gray-600">
            Войдите в систему используя Telegram бота
          </p>
        </div>

        <Show
          when={authStore.isLoading}
          fallback={
            <div class="space-y-4">
              {/* Кнопка открытия бота */}
              <button
                onClick={() => window.open('https://t.me/sgmn_dev_bot', '_blank')}
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                Открыть бота @sgmn_dev_bot
              </button>
              
              <div class="text-center text-sm text-gray-500">
                Отправьте боту команду /start для получения кода
              </div>

              <div class="border-t pt-4">
                <div class="space-y-3">
                  <label 
                    for="auth-code" 
                    class="block text-sm font-medium text-gray-700 text-center"
                  >
                    Код авторизации из Telegram
                  </label>
                  
                  {/* Поле ввода кода */}
                  <div class="flex justify-center">
                    <input
                      id="auth-code"
                      type="text"
                      maxLength="8"
                      placeholder="12345678"
                      onInput={handleCodeInput}
                      disabled={isVerifying()}
                      class="w-40 px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                  </div>

                  {/* Кнопка верификации */}
                  <button
                    onClick={handleVerifyCode}
                    disabled={authCode().length !== 8 || isVerifying()}
                    class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <Show
                      when={isVerifying()}
                      fallback="Подтвердить код"
                    >
                      <div class="flex items-center justify-center gap-2">
                        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Проверка...
                      </div>
                    </Show>
                  </button>
                </div>
              </div>

              {/* Ошибка авторизации */}
              <Show when={authError()}>
                <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <p class="text-red-700 text-sm">
                    {authError()}
                  </p>
                </div>
              </Show>
            </div>
          }
        >
          {/* Лоадер при проверке авторизации */}
          <div class="text-center space-y-4">
            <div class="flex justify-center">
              <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
            <p class="text-gray-600">Проверка авторизации...</p>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default TelegramAuth; 
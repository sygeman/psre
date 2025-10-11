import { createEffect, createSignal, Show } from "solid-js"
import { authService } from "./auth.service"

export const AuthTelegram = () => {
  const [authCode, setAuthCode] = createSignal("")
  const [isVerifying, setIsVerifying] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)
  const [authError, setAuthError] = createSignal("")

  const handleVerifyCode = async () => {
    setIsVerifying(true)
    setAuthError("")
    setIsLoading(true)

    const result = await authService.verifyCode(authCode())

    if (result.success) {
      setAuthCode("")
      setAuthError("")
      window.location.reload()
    } else {
      setAuthError(result.error || "Произошла ошибка")
    }

    setIsVerifying(false)
    setIsLoading(false)
  }

  createEffect(() => {
    if (authCode().length === 8) handleVerifyCode()
  })

  const handleCodeInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value
      .replace(/[^0-9]/g, "")
      .trim()
      .slice(0, 8)
    setAuthCode(value)
    target.value = value
    // Очищаем ошибку при вводе
    if (authError()) setAuthError("")
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-black p-4">
      <div class="max-w-md w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg shadow-2xl border border-white/10 backdrop-blur-sm p-6">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-white mb-2">Авторизация через Telegram</h1>
          <p class="text-slate-400">Войдите в систему используя Telegram бота</p>
        </div>

        <Show
          when={isLoading()}
          fallback={
            <div class="space-y-4">
              {/* Кнопка открытия бота */}
              <button
                onClick={() => window.open("https://t.me/sgmn_dev_bot", "_blank")}
                class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>🚀</span>
                Открыть бота @sgmn_dev_bot
              </button>

              <div class="text-center text-sm text-slate-500">Отправьте боту команду /start для получения кода</div>

              <div class="border-t border-white/10 pt-4">
                <div class="space-y-3">
                  <label for="auth-code" class="block text-sm font-medium text-white text-center">
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
                      class="w-40 px-3 py-2 border border-slate-600 bg-slate-800/50 rounded-md text-center text-lg font-mono tracking-wider text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-700/50 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Ошибка авторизации */}
              <Show when={authError()}>
                <div class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-center backdrop-blur-sm">
                  <p class="text-red-300 text-sm">{authError()}</p>
                </div>
              </Show>
            </div>
          }
        >
          {/* Лоадер при проверке авторизации */}
          <div class="text-center space-y-4">
            <div class="flex justify-center">
              <div class="w-8 h-8 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <p class="text-slate-400">Проверка авторизации...</p>
          </div>
        </Show>
      </div>
    </div>
  )
}

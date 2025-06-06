<template>
  <div class="flex h-full flex-col">
    <div class="flex-1 flex flex-col p-4">
      <!-- Центральная часть с барабанами и результатом -->
      <div class="flex-1 flex flex-col items-center justify-center gap-6">
        <!-- Слот-машина -->
        <div
          class="relative p-6 bg-slate-800/80 rounded-xl shadow-lg overflow-hidden"
        >
          <!-- Градиентный фон -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"
          />
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]"
          />

          <!-- Светящиеся частицы -->
          <div class="absolute inset-0 opacity-30">
            <div
              class="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]"
            />
            <div
              class="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]"
            />
          </div>

          <!-- Барабаны -->
          <div class="relative flex gap-2">
            <div
              v-for="(position, index) in positions"
              :key="index"
              class="w-24 h-24 bg-slate-900/90 rounded-lg relative overflow-hidden backdrop-blur-sm shadow-lg"
            >
              <!-- Блики на барабане -->
              <div
                class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"
              />

              <div
                class="absolute left-0 w-full transition-transform"
                :style="{
                  transform: `translateY(${-position % (SYMBOL_HEIGHT * symbols.length)}px)`,
                  'transition-duration': isSpinning ? '0ms' : '500ms',
                }"
              >
                <div
                  v-for="(symbol, symbolIndex) in [...symbols, ...symbols]"
                  :key="symbolIndex"
                  class="relative w-full h-24 flex items-center justify-center text-4xl"
                >
                  <!-- Фон ячейки -->
                  <div class="absolute inset-0 bg-slate-800/80" />
                  <!-- Разделительная линия -->
                  <div
                    class="absolute bottom-0 left-0 right-0 h-px bg-slate-700/50"
                  />
                  <!-- Внутреннее свечение -->
                  <div
                    class="absolute inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-sm"
                  />
                  <!-- Символ -->
                  <div class="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                    {{ symbol }}
                  </div>
                </div>
              </div>

              <!-- Эффект затемнения сверху и снизу -->
              <div
                class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-900/90 to-transparent"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900/90 to-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Результат -->
        <div class="h-[40px] flex items-center">
          <div
            v-if="result && result !== ''"
            :class="[
              'flex items-center gap-2 text-lg font-medium',
              result === 'Победа' && winningSymbol
                ? 'bg-green-500/10 text-green-400 px-4 py-1.5 rounded-lg border border-green-500/20'
                : 'text-slate-400',
            ]"
          >
            <template v-if="result === 'Победа' && winningSymbol">
              <span class="text-2xl">{{ winningSymbol }}</span>
              <span>+{{ winningAmount?.toLocaleString('ru-RU') }}</span>
            </template>
            <span v-else-if="result === 'Проигрыш'">Попробуйте еще раз</span>
          </div>
        </div>
      </div>

      <!-- Попытки и шкала внизу -->
      <div
        class="h-[60px] text-sm text-slate-400 flex flex-col items-center gap-1 mt-auto"
      >
        <div>Осталось попыток: {{ attempts }}</div>
        <div
          v-if="attempts < MAX_ATTEMPTS && nextAttemptTime"
          class="relative w-48 h-6 bg-slate-700 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-blue-500 transition-all duration-100 flex items-center justify-center text-xs text-white/90 font-medium"
            :style="{ width: `${progress}%` }"
          >
            <!-- Блики на прогресс-баре -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20"
            />
            <div
              class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] animate-[shine_2s_ease-in-out_infinite]"
            />
          </div>
          <div
            class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/90"
          >
            +1 попытка через {{ timeLeft }}
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопка внизу -->
    <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
      <button
        @click="spin"
        :disabled="isSpinning || (attempts <= 0 && diamond < 100)"
        :class="[
          'relative w-full rounded-lg py-3 text-sm font-medium text-white transition-colors overflow-hidden',
          isSpinning || (attempts <= 0 && diamond < 100)
            ? 'bg-slate-600/50 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600',
        ]"
      >
        <!-- Блики на кнопке -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"
        />

        <!-- Текст кнопки -->
        <span class="relative">
          {{ buttonText }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const symbols = ['🍎', '🌾', '⚙️', '⛽', '💎']
const SYMBOL_HEIGHT = 96
const MAX_ATTEMPTS = 5
const RESTORE_TIME = 30000 // 30 секунд

// Реактивные данные
const positions = ref([0, 0, 0])
const isSpinning = ref(false)
const result = ref('')
const attempts = ref(MAX_ATTEMPTS)
const nextAttemptTime = ref<number | null>(null)
const winningSymbol = ref<string | null>(null)
const winningAmount = ref<number | null>(null)
const timeLeft = ref('')
const progress = ref(100)
const diamond = ref(1234)

// Геттеры
const buttonText = computed(() => {
  if (isSpinning.value) return 'Крутится...'
  if (attempts.value <= 0) {
    return diamond.value < 100 ? 'Недостаточно алмазов' : '100 💎 за прокрутку'
  }
  return 'Крутить'
})

// Таймер
let timer: number | null = null

const updateTimer = () => {
  if (!nextAttemptTime.value) {
    timeLeft.value = ''
    progress.value = 100
    return
  }

  const now = Date.now()
  const secondsLeft = Math.max(
    0,
    Math.ceil((nextAttemptTime.value - now) / 1000),
  )
  timeLeft.value = `${secondsLeft} сек`

  const elapsed = RESTORE_TIME - (nextAttemptTime.value - now)
  progress.value = Math.min(100, Math.max(0, (elapsed * 100) / RESTORE_TIME))

  if (now >= nextAttemptTime.value) {
    attempts.value = Math.min(attempts.value + 1, MAX_ATTEMPTS)
    nextAttemptTime.value = null
  }
}

// Утилиты
const getRandomAmount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const addReward = (symbol: string) => {
  const rewards = {
    '🍎': { min: 100, max: 500 },
    '🌾': { min: 50, max: 300 },
    '⚙️': { min: 25, max: 150 },
    '⛽': { min: 75, max: 400 },
    '💎': { min: 10, max: 50 },
  }

  const reward = rewards[symbol] || { min: 10, max: 50 }
  const amount = getRandomAmount(reward.min, reward.max)

  return { amount }
}

const determineOutcome = () => {
  const chance = Math.random() * 100

  // 20% шанс на выигрыш
  if (chance < 20) {
    const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)]
    return [winningSymbol, winningSymbol, winningSymbol]
  }

  // Проигрышная комбинация
  const result = []
  for (let i = 0; i < 3; i++) {
    let symbol
    do {
      symbol = symbols[Math.floor(Math.random() * symbols.length)]
    } while (result.length > 0 && result.every((s) => s === symbol))
    result.push(symbol)
  }
  return result
}

const spinReel = (reelIndex: number, finalSymbol: string) => {
  const startTime = Date.now()
  const totalRotations = 10 + reelIndex * 2
  const finalIndex = symbols.indexOf(finalSymbol)
  const finalPosition =
    (totalRotations * symbols.length + finalIndex) * SYMBOL_HEIGHT

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const duration = 2000 + reelIndex * 500

    if (elapsed < duration) {
      const progress = elapsed / duration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentPosition = easeOut * finalPosition

      positions.value[reelIndex] = currentPosition

      requestAnimationFrame(animate)
    } else {
      positions.value[reelIndex] = finalPosition

      if (reelIndex === 2) {
        const finalSymbols = [0, 1, 2].map(
          (i) =>
            symbols[
              Math.floor((positions.value[i] / SYMBOL_HEIGHT) % symbols.length)
            ],
        )
        if (
          finalSymbols[0] === finalSymbols[1] &&
          finalSymbols[1] === finalSymbols[2]
        ) {
          const { amount } = addReward(finalSymbols[0])
          winningSymbol.value = finalSymbols[0]
          winningAmount.value = amount
          result.value = 'Победа'
        } else {
          winningSymbol.value = null
          winningAmount.value = null
          result.value = 'Проигрыш'
        }
        isSpinning.value = false
      }
    }
  }

  requestAnimationFrame(animate)
}

const spin = () => {
  if (isSpinning.value) return

  if (attempts.value <= 0) {
    if (diamond.value < 100) {
      return
    }
    diamond.value -= 100
  } else {
    attempts.value--
    if (attempts.value < MAX_ATTEMPTS && !nextAttemptTime.value) {
      nextAttemptTime.value = Date.now() + RESTORE_TIME
      timer = setInterval(updateTimer, 100)
    }
  }

  isSpinning.value = true
  result.value = ''
  winningSymbol.value = null

  const outcome = determineOutcome()

  outcome.forEach((symbol, index) => {
    setTimeout(() => {
      spinReel(index, symbol)
    }, index * 200)
  })
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

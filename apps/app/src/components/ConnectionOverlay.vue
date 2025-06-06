<template>
  <div
    v-if="shouldShow"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="p-8 text-center max-w-md mx-4">
      <h3 class="text-xl font-bold text-white mb-2">
        {{ statusInfo.title }}
      </h3>

      <p class="text-slate-400 text-sm mb-6 leading-relaxed">
        {{ statusInfo.description }}
      </p>

      <div v-if="status === 'error'" class="mb-4">
        <div
          class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 backdrop-blur-sm"
        >
          <p class="text-red-300 text-xs font-mono break-words">
            {{ errorMessage }}
          </p>
        </div>

        <button
          @click="reconnect"
          class="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg mt-4"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type WebSocketStatus = 'connecting' | 'connected' | 'reconnecting' | 'error'

// Моковые данные
const status = ref<WebSocketStatus>('connected')
const errorMessage = ref('')

const shouldShow = computed(() => {
  return (
    status.value === 'connecting' ||
    status.value === 'reconnecting' ||
    status.value === 'error'
  )
})

const statusInfo = computed(() => {
  switch (status.value) {
    case 'connecting':
      return {
        title: 'Подключение к серверу',
        description: 'Устанавливаем соединение...',
      }
    case 'reconnecting':
      return {
        title: 'Переподключение',
        description: 'Восстанавливаем соединение с сервером...',
      }
    case 'error':
      return {
        title: 'Проблемы с соединением',
        description: errorMessage.value || 'Не удается подключиться к серверу',
      }
    default:
      return {
        title: 'Соединение',
        description: 'Проверяем соединение...',
      }
  }
})

const reconnect = () => {
  status.value = 'connecting'
  setTimeout(() => {
    status.value = 'connected'
  }, 2000)
}
</script>

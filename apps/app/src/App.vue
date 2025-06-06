<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useQuery, useSubscription, useMutation } from '@vue/apollo-composable'
import {
  GetChatMessagesDocument,
  CreatedChatMessageDocument,
  CreateChatMessageDocument,
  type ChatMessage,
} from '@/graphql/generated'

// ID тестового чата (в реальном приложении это будет передаваться как пропс или из роутера)
const CHAT_ID = '1'

// Список сообщений
const messages = ref<ChatMessage[]>([])

// Флаг для отслеживания первой загрузки
const isInitialized = ref(false)

// Загружаем существующие сообщения
const { result: messagesResult, loading } = useQuery(GetChatMessagesDocument, {
  chatId: CHAT_ID,
})

// Подписка на новые сообщения
const { result: newMessageResult } = useSubscription(
  CreatedChatMessageDocument,
  {
    chatId: CHAT_ID,
  },
)

// Мутация для создания сообщений
const { mutate: createChatMessage } = useMutation(CreateChatMessageDocument)

// Тестовые данные
const testMessages = [
  'Привет всем!',
  'Как дела?',
  'Кто-нибудь видел последние новости?',
  'Отличная погода сегодня!',
  'Не забудьте про встречу в 15:00',
  'Кто идет на обед?',
  'Интересная статья в блоге компании',
  'Поздравляю с успешным запуском!',
  'Нужна помощь с проектом',
  'Спасибо за отличную работу!',
]

const testUsers = [
  { id: 'user_1', name: 'Алекс' },
  { id: 'user_2', name: 'Мария' },
  { id: 'user_3', name: 'Дмитрий' },
  { id: 'user_4', name: 'Анна' },
  { id: 'user_5', name: 'Сергей' },
]

let messageCounter = 1

// Автоматическая отправка случайных сообщений
setInterval(() => {
  const randomMessage =
    testMessages[Math.floor(Math.random() * testMessages.length)]
  const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)]

  createChatMessage({
    input: {
      chatId: CHAT_ID,
      content: randomMessage,
      userId: randomUser.id,
      userName: randomUser.name,
    },
  })
}, 100)

// Обрабатываем загрузку существующих сообщений (только при первой загрузке)
const handleMessagesResult = (result: any) => {
  if (result?.chatMessages && !isInitialized.value) {
    messages.value = [...result.chatMessages]
    isInitialized.value = true
    console.log('Загружены начальные сообщения:', result.chatMessages.length)
  }
}

// Обрабатываем новые сообщения из подписки
const handleNewMessage = (result: any) => {
  if (result?.createdChatMessage) {
    const newMessage = result.createdChatMessage
    // Заменяем массив на одно последнее сообщение
    messages.value = [newMessage]
  }
}

// Следим за результатами запросов
onMounted(() => {
  if (messagesResult.value) {
    handleMessagesResult(messagesResult.value)
  }
})

// Реактивно обрабатываем изменения
watchEffect(() => {
  if (messagesResult.value) {
    handleMessagesResult(messagesResult.value)
  }
  if (newMessageResult.value) {
    handleNewMessage(newMessageResult.value)
  }
})

// Форматирование времени
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-white mb-6">Список сообщений чата</h1>

      <!-- Индикатор загрузки -->
      <div v-if="loading" class="flex justify-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"
        ></div>
      </div>

      <!-- Список сообщений -->
      <div v-else class="space-y-4">
        <div
          v-for="message in messages"
          :key="message.id"
          class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 hover:bg-gray-750 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-medium text-white">{{
                  message.userName
                }}</span>
                <span class="text-xs text-gray-400"
                  >ID: {{ message.userId }}</span
                >
              </div>
              <p class="text-gray-200 mb-2">{{ message.content }}</p>
              <div class="text-xs text-gray-500">
                {{ formatTime(message.createdAt) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Сообщение если нет сообщений -->
        <div
          v-if="!messages.length && !loading"
          class="text-center py-8 text-gray-400"
        >
          Сообщений пока нет. Ожидаем новые сообщения...
        </div>
      </div>

      <!-- Информация о подписке -->
      <div class="mt-8 p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
        <p class="text-sm text-blue-300">
          🔄 Активна подписка на новые сообщения в чате:
          <strong>{{ CHAT_ID }}</strong>
        </p>
        <p class="text-xs text-blue-400 mt-1">
          Новые сообщения будут появляться автоматически
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Плавные анимации для новых сообщений */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Кастомный hover для карточек */
.hover\:bg-gray-750:hover {
  background-color: rgb(55 65 81);
}
</style>

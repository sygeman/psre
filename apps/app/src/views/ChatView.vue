<template>
  <BackLayout title="Чат">
    <div class="flex h-full flex-col">
      <div class="grid grid-cols-2 border-b border-slate-700/25">
        <button
          :class="[
            'p-4 text-sm',
            activeChannel === 'region'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveChannel('region')"
        >
          🌍 Регион
        </button>
        <button
          :class="[
            'p-4 text-sm',
            activeChannel === 'alliance'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveChannel('alliance')"
        >
          👥 Альянс
        </button>
      </div>

      <div class="hide-scrollbar flex-1 overflow-y-auto p-4 space-y-3">
        <div
          v-for="message in currentMessages"
          :key="message.id"
          class="flex gap-3"
        >
          <div
            class="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            👤
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium text-sm">{{ message.author }}</span>
              <span class="text-xs text-slate-400">{{ message.time }}</span>
            </div>
            <div class="text-sm text-slate-200">{{ message.text }}</div>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-700/25 p-4">
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Введите сообщение..."
            class="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            @keydown.enter="sendMessage"
          />
          <button
            @click="sendMessage"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'

type ChatChannel = 'region' | 'alliance'

interface Message {
  id: string
  author: string
  text: string
  time: string
  channel: ChatChannel
}

// Реактивные данные
const activeChannel = ref<ChatChannel>('region')
const newMessage = ref('')

// Моковые данные сообщений
const messages = ref<Message[]>([
  {
    id: '1',
    author: 'Игрок1',
    text: 'Привет всем!',
    time: '14:30',
    channel: 'region',
  },
  {
    id: '2',
    author: 'Игрок2',
    text: 'Как дела?',
    time: '14:31',
    channel: 'region',
  },
  {
    id: '3',
    author: 'Игрок3',
    text: 'Кто поможет с атакой?',
    time: '14:32',
    channel: 'region',
  },
  {
    id: '4',
    author: 'Союзник1',
    text: 'Готовимся к атаке',
    time: '14:25',
    channel: 'alliance',
  },
  {
    id: '5',
    author: 'Союзник2',
    text: 'Нужна помощь с ресурсами',
    time: '14:28',
    channel: 'alliance',
  },
])

// Вычисляемые свойства
const currentMessages = computed(() =>
  messages.value.filter((m) => m.channel === activeChannel.value),
)

const setActiveChannel = (channel: ChatChannel) => {
  activeChannel.value = channel
}

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const message: Message = {
      id: Date.now().toString(),
      author: 'Я',
      text: newMessage.value,
      time: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      channel: activeChannel.value,
    }
    messages.value.push(message)
    newMessage.value = ''
  }
}
</script>

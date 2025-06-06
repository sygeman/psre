<template>
  <BackLayout title="Почта">
    <div class="flex h-full flex-col">
      <div class="hide-scrollbar flex-1 overflow-y-auto">
        <div class="divide-y divide-slate-700/25">
          <div
            v-for="mail in mails"
            :key="mail.id"
            :class="[
              'flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-slate-800',
              !mail.isRead ? 'bg-slate-800/50' : '',
            ]"
            @click="() => markAsRead(mail.id)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  v-if="!mail.isRead"
                  class="size-2 rounded-full bg-blue-500"
                />
                <div class="font-medium">{{ mail.title }}</div>
              </div>
              <div class="text-sm text-slate-400">{{ mail.date }}</div>
            </div>
            <div class="text-sm text-slate-400">{{ mail.message }}</div>
            <div v-if="mail.hasReward" class="flex items-center gap-1 text-sm">
              <span>Награда:</span>
              <span>{{ getRewardIcon(mail.hasReward.type) }}</span>
              <span>
                {{ mail.hasReward.amount.toLocaleString('en-US') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'

type RewardType =
  | 'food'
  | 'wood'
  | 'steel'
  | 'fuel'
  | 'diamond'
  | 'serum'
  | 'exp'

interface Mail {
  id: string
  title: string
  message: string
  date: string
  isRead: boolean
  hasReward?: {
    type: RewardType
    amount: number
  }
}

// Моковые данные
const mails = ref<Mail[]>([
  {
    id: '1',
    title: 'Добро пожаловать!',
    message: 'Добро пожаловать в игру! Получите приветственный бонус.',
    date: '2025-06-06',
    isRead: false,
    hasReward: { type: 'diamond', amount: 100 },
  },
  {
    id: '2',
    title: 'Ежедневная награда',
    message: 'Ваша ежедневная награда готова к получению.',
    date: '2025-06-05',
    isRead: true,
    hasReward: { type: 'food', amount: 1000 },
  },
  {
    id: '3',
    title: 'Обновление игры',
    message: 'Вышло новое обновление с множеством улучшений.',
    date: '2025-06-04',
    isRead: true,
  },
])

const getRewardIcon = (type: RewardType) => {
  switch (type) {
    case 'food':
      return '🌾'
    case 'wood':
      return '🪵'
    case 'steel':
      return '🔩'
    case 'fuel':
      return '🛢️'
    case 'diamond':
      return '💎'
    case 'serum':
      return '🧪'
    case 'exp':
      return '✨'
  }
}

const markAsRead = (mailId: string) => {
  const mail = mails.value.find((m) => m.id === mailId)
  if (mail) {
    mail.isRead = true
  }
}
</script>

<template>
  <BackLayout title="Квесты">
    <div class="flex h-full flex-col">
      <div class="grid grid-cols-3 border-b border-slate-700/25">
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'main'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('main')"
        >
          Основной
        </button>
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'daily'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('daily')"
        >
          Суточный
        </button>
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'alliance'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('alliance')"
        >
          Альянса
        </button>
      </div>

      <div class="hide-scrollbar flex-1 overflow-y-auto">
        <div class="divide-y divide-slate-700/25">
          <div
            v-for="quest in currentQuests"
            :key="quest.id"
            class="flex flex-col gap-2 p-4"
          >
            <div class="flex items-center justify-between">
              <div class="font-medium">{{ quest.title }}</div>
              <div class="flex items-center gap-1">
                <span>{{ getRewardIcon(quest.reward.type) }}</span>
                <span><AnimatedNumber :value="quest.reward.amount" /></span>
              </div>
            </div>
            <div class="text-sm text-slate-400">{{ quest.description }}</div>
            <div class="flex items-center gap-2">
              <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                <div
                  class="h-full bg-blue-500 transition-all duration-300"
                  :style="{
                    width: `${(quest.progress / quest.total) * 100}%`,
                  }"
                />
              </div>
              <div class="text-sm text-slate-400">
                {{ quest.progress }}/{{ quest.total }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import AnimatedNumber from '@/components/AnimatedNumber.vue'

type Quest = {
  id: number
  title: string
  description: string
  progress: number
  total: number
  reward: {
    type: 'food' | 'wood' | 'steel' | 'fuel' | 'diamond' | 'exp'
    amount: number
  }
}

type TabType = 'main' | 'daily' | 'alliance'

// Реактивные данные
const activeTab = ref<TabType>('main')

// Моковые данные квестов
const quests: Record<TabType, Quest[]> = {
  main: [
    {
      id: 1,
      title: 'Сбор ресурсов',
      description: 'Соберите 1000 единиц еды',
      progress: 450,
      total: 1000,
      reward: { type: 'diamond', amount: 50 },
    },
    {
      id: 2,
      title: 'Развитие базы',
      description: 'Улучшите 3 здания',
      progress: 1,
      total: 3,
      reward: { type: 'exp', amount: 1000 },
    },
  ],
  daily: [
    {
      id: 3,
      title: 'Дневной сбор',
      description: 'Соберите 500 единиц стали',
      progress: 200,
      total: 500,
      reward: { type: 'steel', amount: 100 },
    },
  ],
  alliance: [
    {
      id: 4,
      title: 'Помощь альянсу',
      description: 'Помогите 5 членам альянса',
      progress: 2,
      total: 5,
      reward: { type: 'diamond', amount: 20 },
    },
  ],
}

// Вычисляемое свойство для текущих квестов
const currentQuests = computed(() => quests[activeTab.value])

const getRewardIcon = (type: Quest['reward']['type']) => {
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
    case 'exp':
      return '✨'
  }
}

const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
}
</script>

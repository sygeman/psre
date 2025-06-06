<template>
  <BackLayout title="Альянс">
    <div class="flex h-full flex-col">
      <div class="p-4 border-b border-slate-700/25">
        <div class="text-center">
          <div class="text-2xl mb-2">⚔️</div>
          <div class="text-lg font-medium">Альянс Воинов</div>
          <div class="text-sm text-slate-400">
            Уровень 15 • 45/50 участников
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 border-b border-slate-700/25">
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'info'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('info')"
        >
          Информация
        </button>
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'members'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('members')"
        >
          Участники
        </button>
      </div>

      <div class="hide-scrollbar flex-1 overflow-y-auto">
        <div v-if="activeTab === 'info'" class="p-4 space-y-4">
          <div class="bg-slate-800 rounded-lg p-4">
            <div class="text-sm font-medium mb-2">Бонусы альянса</div>
            <div class="text-xs text-slate-400">
              • +15% к производству ресурсов<br />
              • +10% к скорости строительства<br />
              • +20% к защите базы
            </div>
          </div>
          <div class="bg-slate-800 rounded-lg p-4">
            <div class="text-sm font-medium mb-2">Описание</div>
            <div class="text-xs text-slate-400">
              Сильный альянс для активных игроков. Помогаем друг другу
              развиваться и побеждать в войнах!
            </div>
          </div>
        </div>

        <div
          v-else-if="activeTab === 'members'"
          class="divide-y divide-slate-700/25"
        >
          <div
            v-for="member in members"
            :key="member.id"
            class="flex items-center gap-3 p-4"
          >
            <div
              class="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center"
            >
              👤
            </div>
            <div class="flex-1">
              <div class="font-medium">{{ member.name }}</div>
              <div class="text-sm text-slate-400">
                {{ member.role }} • Мощь: {{ member.power.toLocaleString() }}
              </div>
            </div>
            <div class="text-xs text-slate-400">
              {{ member.lastSeen }}
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

interface Member {
  id: number
  name: string
  role: string
  power: number
  lastSeen: string
}

// Реактивные данные
const activeTab = ref<'info' | 'members'>('info')

// Моковые данные участников
const members = ref<Member[]>([
  {
    id: 1,
    name: 'Командир123',
    role: 'Лидер',
    power: 500000,
    lastSeen: 'онлайн',
  },
  {
    id: 2,
    name: 'Воин456',
    role: 'Офицер',
    power: 350000,
    lastSeen: '2 часа назад',
  },
  {
    id: 3,
    name: 'Защитник789',
    role: 'Участник',
    power: 280000,
    lastSeen: '1 день назад',
  },
  {
    id: 4,
    name: 'Стратег100',
    role: 'Участник',
    power: 220000,
    lastSeen: '3 дня назад',
  },
])

const setActiveTab = (tab: 'info' | 'members') => {
  activeTab.value = tab
}
</script>

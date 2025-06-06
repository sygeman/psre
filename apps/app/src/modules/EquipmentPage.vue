<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="flex justify-between gap-4">
      <!-- Левая колонка -->
      <div class="flex flex-col gap-4">
        <div
          v-for="(slot, index) in leftEquipmentSlots"
          :key="index"
          class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
        >
          <div class="text-2xl">{{ slot.icon }}</div>
          <div class="flex flex-col">
            <div class="text-sm font-medium text-slate-200">
              {{ slot.label }}
            </div>
            <div
              v-if="slot.upgradeLevel"
              class="flex items-center gap-1 text-xs text-slate-400"
            >
              <span>+{{ slot.upgradeLevel }}</span>
              <div v-if="slot.stars" class="flex text-yellow-500">
                {{ '★'.repeat(slot.stars) }}
              </div>
            </div>
            <div v-else class="text-xs text-slate-500">Пусто</div>
          </div>
        </div>
      </div>

      <!-- Плейсхолдер для 3D модели -->
      <div class="flex w-64 items-center justify-center rounded bg-slate-800">
        <div class="text-sm text-slate-600">3D Модель</div>
      </div>

      <!-- Правая колонка -->
      <div class="flex flex-col gap-4">
        <div
          v-for="(slot, index) in rightEquipmentSlots"
          :key="index"
          class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
        >
          <div class="text-2xl">{{ slot.icon }}</div>
          <div class="flex flex-col">
            <div class="text-sm font-medium text-slate-200">
              {{ slot.label }}
            </div>
            <div
              v-if="slot.upgradeLevel"
              class="flex items-center gap-1 text-xs text-slate-400"
            >
              <span>+{{ slot.upgradeLevel }}</span>
              <div v-if="slot.stars" class="flex text-yellow-500">
                {{ '★'.repeat(slot.stars) }}
              </div>
            </div>
            <div v-else class="text-xs text-slate-500">Пусто</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex rounded-lg bg-slate-800/50 p-1">
        <button
          v-for="set in equipmentSets"
          :key="set.id"
          :class="[
            'px-4 py-2 text-sm rounded-md transition-colors',
            activeSet === set.id
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50',
          ]"
          @click="activeSet = set.id"
        >
          {{ set.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface EquipmentSlot {
  icon: string
  label: string
  upgradeLevel?: number
  canUpgrade?: boolean
  stars?: number
}

interface Tab {
  id: string
  label: string
}

// Замоканные данные
const leftEquipmentSlots: EquipmentSlot[] = [
  { icon: '⚔️', label: 'Оружие', upgradeLevel: 3, canUpgrade: true, stars: 7 },
  { icon: '🛡️', label: 'Щит', upgradeLevel: 1, stars: 3 },
  { icon: '💍', label: 'Кольцо' },
]

const rightEquipmentSlots: EquipmentSlot[] = [
  { icon: '⛑️', label: 'Шлем', upgradeLevel: 2, canUpgrade: true, stars: 11 },
  { icon: '🦺', label: 'Броня', upgradeLevel: 4, stars: 5 },
  { icon: '👢', label: 'Ботинки' },
]

const equipmentSets: Tab[] = [
  { id: 'military', label: 'Военный' },
  { id: 'builder', label: 'Строитель' },
  { id: 'technologist', label: 'Технолог' },
  { id: 'training', label: 'Обучение' },
]

const activeSet = ref('military')
</script>

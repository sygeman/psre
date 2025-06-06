<template>
  <BackLayout title="Арсенал">
    <template #rightContent>
      <div class="px-2">
        <ResourceDisplay icon="🔧" :value="materials" />
      </div>
    </template>

    <div class="flex h-full flex-col">
      <!-- Вкладки -->
      <div class="grid grid-cols-2 border-b border-slate-700/25">
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'weapons'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('weapons')"
        >
          Изготовление оружия
        </button>
        <button
          :class="[
            'p-4 text-sm',
            activeTab === 'materials'
              ? 'border-b-2 border-blue-500 font-medium'
              : 'text-slate-400',
          ]"
          @click="() => setActiveTab('materials')"
        >
          Производство запчастей
        </button>
      </div>

      <!-- Контент вкладок -->
      <div class="hide-scrollbar flex-1 overflow-y-auto">
        <div v-if="activeTab === 'weapons'" class="flex flex-col h-full">
          <div class="flex-1 p-4">
            <div class="flex items-center justify-center">
              <div
                class="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-800 text-4xl"
              >
                ⚔️
              </div>
            </div>
            <div class="mt-4 text-center">
              <div class="text-lg font-medium">Боевое оружие</div>
              <div class="mt-2 text-sm text-slate-400">Требуется: 🔧 100</div>
              <div class="mt-2 text-sm text-slate-400">3:00</div>
            </div>
          </div>
          <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
            <button
              class="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600"
              @click="startWeaponCreation"
            >
              Создать оружие
            </button>
          </div>
        </div>

        <div v-else-if="activeTab === 'materials'" class="flex flex-col h-full">
          <div class="flex-1 p-4">
            <div class="flex items-center justify-center">
              <div
                class="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-800 text-4xl"
              >
                🔧
              </div>
            </div>
            <div class="mt-4 text-center">
              <div class="text-lg font-medium">Запчасти</div>
              <div class="mt-2 text-sm text-slate-400">1:00</div>
            </div>
          </div>
          <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
            <button
              class="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600"
              @click="startProduction"
            >
              Производить запчасти
            </button>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import ResourceDisplay from '@/components/ResourceDisplay.vue'

// Реактивные данные
const activeTab = ref<'weapons' | 'materials'>('weapons')
const materials = ref(450)

const setActiveTab = (tab: 'weapons' | 'materials') => {
  activeTab.value = tab
}

const startWeaponCreation = () => {
  console.log('Starting weapon creation')
}

const startProduction = () => {
  console.log('Starting material production')
}
</script>

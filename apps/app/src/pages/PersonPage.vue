<template>
  <BackLayout title="Персонаж">
    <div class="flex flex-shrink-0 flex-col">
      <Tabs
        :tabs="PERSON_TABS"
        :active-tab="activeTab"
        :on-tab-change="setActiveTab"
      />
    </div>

    <!-- Контент вкладок -->
    <div class="hide-scrollbar flex-grow overflow-auto">
      <div v-if="activeTab === 'equipment'">
        <EquipmentPage />
      </div>
      <div v-else-if="activeTab === 'chip'" class="p-4">
        <div class="mb-4 text-lg">Чип</div>
        <!-- Здесь будет контент вкладки Чип -->
      </div>
      <div v-else-if="activeTab === 'module'" class="p-4">
        <div class="mb-4 text-lg">Модуль</div>
        <!-- Здесь будет контент вкладки Модуль -->
      </div>
      <div v-else-if="activeTab === 'cube'" class="p-4">
        <div class="mb-4 text-lg">Куб</div>
        <!-- Здесь будет контент вкладки Куб -->
      </div>
      <div v-else-if="activeTab === 'biomod'" class="p-4">
        <div class="mb-4 text-lg">Биомодификатор</div>
        <!-- Здесь будет контент вкладки Биомодификатор -->
      </div>
    </div>

    <!-- Фиксированная информация внизу -->
    <div class="flex-shrink-0 border-t border-slate-700 bg-slate-900 p-4">
      <div class="flex flex-col gap-4">
        <!-- Имя и лайки -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1">
            <span>👍</span>
            <span>
              <AnimatedNumber :value="likes" />
            </span>
          </div>
          <div class="font-medium">{{ playerName }}</div>
        </div>

        <!-- Аватар и прогресс бары -->
        <div class="flex gap-4">
          <!-- Аватар -->
          <div
            class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800"
          >
            <CharacterAvatar class="h-16 w-16" />
          </div>

          <!-- Прогресс бары -->
          <div class="flex flex-col gap-1.5 flex-grow px-1">
            <!-- Опыт -->
            <div class="flex items-center gap-2">
              <div class="w-full h-2 rounded-sm bg-slate-800">
                <div
                  class="h-full rounded-sm bg-blue-500"
                  :style="{ width: '60%' }"
                />
              </div>
              <span class="text-xs text-slate-400 w-12 text-right">60/100</span>
            </div>

            <!-- Энергия -->
            <div class="flex items-center gap-2">
              <div class="w-full h-2 rounded-sm bg-slate-800">
                <div
                  class="h-full rounded-sm bg-yellow-500"
                  :style="{ width: '80%' }"
                />
              </div>
              <span class="text-xs text-slate-400 w-12 text-right">80/100</span>
            </div>

            <!-- Здоровье -->
            <div class="flex items-center gap-2">
              <div class="w-full h-2 rounded-sm bg-slate-800">
                <div
                  class="h-full rounded-sm bg-red-500"
                  :style="{ width: '45%' }"
                />
              </div>
              <span class="text-xs text-slate-400 w-12 text-right">45/100</span>
            </div>
          </div>
        </div>

        <!-- Мощь и убийства -->
        <div class="grid grid-cols-2 gap-4">
          <div
            class="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2"
          >
            <span>💪</span>
            <span>
              <AnimatedNumber :value="power" />
            </span>
          </div>
          <div
            class="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2"
          >
            <span>💀</span>
            <span>
              <AnimatedNumber :value="kills" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import Tabs from '@/components/Tabs.vue'
import EquipmentPage from '@/modules/EquipmentPage.vue'
import CharacterAvatar from '@/components/CharacterAvatar.vue'
import AnimatedNumber from '@/components/AnimatedNumber.vue'

const PERSON_TABS = [
  { id: 'equipment', label: 'Снаряжение' },
  { id: 'chip', label: 'Чип' },
  { id: 'module', label: 'Модуль' },
  { id: 'cube', label: 'Куб' },
  { id: 'biomod', label: 'Биомод' },
]

// Реактивные данные
const activeTab = ref('equipment')

// Моковые данные
const likes = ref(1523)
const playerName = ref('Игрок123')
const power = ref(15420)
const kills = ref(847)

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}
</script>

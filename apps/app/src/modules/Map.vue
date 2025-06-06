<template>
  <div class="h-full w-full relative overflow-hidden" :style="backgroundStyle">
    <!-- Основной слой с частицами -->
    <div
      class="absolute inset-0 opacity-40"
      :style="{
        'background-image': `
          radial-gradient(circle at 50% 50%, transparent 90%, rgb(17 24 39)),
          radial-gradient(circle at 15% 15%, rgba(234, 88, 12, 0.4) 0%, transparent 35%),
          radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.4) 0%, transparent 35%),
          radial-gradient(circle at 15% 85%, rgba(147, 51, 234, 0.4) 0%, transparent 35%),
          radial-gradient(circle at 85% 85%, rgba(234, 88, 12, 0.4) 0%, transparent 35%)
        `,
        'background-size': 'cover',
        animation: 'pulse 3s ease-in-out infinite',
      }"
    />
    <!-- Дополнительный слой с движущимися частицами -->
    <div
      class="absolute inset-0 opacity-30"
      :style="{
        'background-image': `
          radial-gradient(circle at 30% 30%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
          radial-gradient(circle at 70% 70%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
          radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.3) 0%, transparent 35%)
        `,
        'background-size': '100% 100%',
        animation: 'particles-move 15s ease-in-out infinite alternate',
      }"
    />
    <!-- Дополнительный слой с подсветкой -->
    <div
      class="absolute inset-0 opacity-20"
      :style="{
        'background-image': `
          linear-gradient(45deg,
            rgba(234, 88, 12, 0.4) 0%,
            transparent 45%,
            transparent 55%,
            rgba(234, 88, 12, 0.4) 100%
          )
        `,
        'background-size': '200% 200%',
        animation: 'background-pan 20s linear infinite',
      }"
    />
    <div
      class="hide-scrollbar grid grid-cols-2 gap-3 overflow-y-auto h-full py-48 px-4 relative z-10"
    >
      <BuildingCard
        v-for="building in buildings"
        :key="building.name"
        v-bind="building"
        @level-up="() => console.log(`Повышение уровня ${building.name}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BuildingCard from '@/components/BuildingCard.vue'

const router = useRouter()

const backgroundStyle = computed(() => ({
  'background-image': `
    radial-gradient(circle at 50% 50%, rgb(30 41 59), rgb(17 24 39)),
    linear-gradient(135deg,
      rgba(234, 88, 12, 0.25) 0%,
      rgba(59, 130, 246, 0.2) 25%,
      rgba(234, 88, 12, 0.25) 50%,
      rgba(147, 51, 234, 0.2) 75%,
      rgba(239, 68, 68, 0.25) 100%
    ),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0V0zm30 30h30v30H30V30zM0 30h30v30H0V30z' fill='%23374151' fill-opacity='0.3'/%3E%3C/svg%3E")
  `,
  'background-size': 'cover, 400% 400%, 60px 60px',
  'background-position': 'center',
  animation: 'background-pan 30s linear infinite',
}))

interface Building {
  color: string
  name: string
  resourceName: string
  level: number
  collectionTime: number
  upgradeDuration: number
  icon: string
  initialProgress?: number
  initialUpgradeProgress?: number
}

// Замоканные данные ресурсов
const RESOURCES = {
  VACCINE: { name: 'Вакцина', icon: '🧪' },
  WOOD: { name: 'Древесина', icon: '🪵' },
  FOOD: { name: 'Еда', icon: '🌾' },
  FUEL: { name: 'Топливо', icon: '🛢️' },
  STEEL: { name: 'Сталь', icon: '🔩' },
}

const ARMORY_CONFIG = {
  icon: '🗡️',
  actionName: 'Создать',
}

const buildings = ref<Building[]>([
  // {
  //   color: 'bg-cyan-900',
  //   name: 'Лаборатория',
  //   resourceName: RESOURCES.VACCINE.name,
  //   level: 3,
  //   collectionTime: 300,
  //   upgradeDuration: 600,
  //   icon: RESOURCES.VACCINE.icon,
  //   initialUpgradeProgress: 75,
  // },
  // {
  //   color: 'bg-emerald-900',
  //   name: 'Лесопилка',
  //   resourceName: RESOURCES.WOOD.name,
  //   level: 5,
  //   collectionTime: 180,
  //   upgradeDuration: 360,
  //   icon: RESOURCES.WOOD.icon,
  // },
  {
    color: 'bg-yellow-900',
    name: 'Ферма',
    resourceName: RESOURCES.FOOD.name,
    level: 4,
    collectionTime: 120,
    upgradeDuration: 300,
    icon: RESOURCES.FOOD.icon,
    initialProgress: 100,
    initialUpgradeProgress: 100,
  },
  // {
  //   color: 'bg-orange-900',
  //   name: 'Заправка',
  //   resourceName: RESOURCES.FUEL.name,
  //   level: 2,
  //   collectionTime: 240,
  //   upgradeDuration: 480,
  //   icon: RESOURCES.FUEL.icon,
  // },
  // {
  //   color: 'bg-slate-700',
  //   name: 'Плавильня',
  //   resourceName: RESOURCES.STEEL.name,
  //   level: 1,
  //   collectionTime: 360,
  //   upgradeDuration: 720,
  //   icon: RESOURCES.STEEL.icon,
  // },
  // {
  //   color: 'bg-red-900',
  //   name: 'Арсенал',
  //   resourceName: '',
  //   level: 2,
  //   collectionTime: 0,
  //   upgradeDuration: 600,
  //   icon: ARMORY_CONFIG.icon,
  // },
])
</script>

<style scoped>
@keyframes background-pan {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

@keyframes particles-move {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(10px, 10px) rotate(5deg);
  }
}
</style>

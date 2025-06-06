<template>
  <div class="w-full h-32 select-none flex-shrink-0">
    <div
      :class="`relative h-full ${color} rounded-lg border border-white/10 overflow-hidden group`"
    >
      <!-- Анимированный градиентный фон -->
      <div
        :class="`absolute inset-0 bg-gradient-to-r ${gradientClass} animate-[pulse_4s_ease-in-out_infinite]`"
      />

      <!-- Светящиеся частицы -->
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]"
        />
        <div
          class="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]"
        />
      </div>

      <!-- Анимированная подсветка при наведении -->
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent"
        />
        <div
          class="absolute w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-2xl animate-pulse"
        />
      </div>

      <!-- Название и уровень -->
      <div
        class="relative h-8 flex items-center justify-between px-3 text-white/80 text-sm font-medium border-b border-white/10 bg-black/10 backdrop-blur-sm"
      >
        <span class="drop-shadow-glow">{{ name }}</span>
        <span
          class="flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold bg-black/20 backdrop-blur-sm"
        >
          {{ level }}
        </span>
      </div>

      <!-- Кнопки сбора и повышения уровня -->
      <div
        class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-6"
      >
        <BuildingButton
          :onClick="handleCollect"
          :disabled="isArmory ? false : progress < 100"
          :color="color"
          :icon="isArmory ? armoryIcon : icon"
          :label="isArmory ? armoryActionName : resourceName"
          :timer="
            isArmory
              ? undefined
              : progress < 100
                ? formatTime(timeLeft)
                : undefined
          "
          :pulseAnimation="isArmory ? false : progress === 100"
        />

        <BuildingButton
          :onClick="handleUpgrade"
          :disabled="upgradeProgress < 100"
          :color="color"
          :iconComponent="UpgradeIcon"
          label="Улучшить"
          :timer="
            upgradeProgress < 100 ? formatTime(upgradeTimeLeft) : undefined
          "
          :pulseAnimation="upgradeProgress === 100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BuildingButton from '@/components/BuildingButton.vue'

interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  initialProgress: 0,
  initialUpgradeProgress: 0,
})

const emit = defineEmits<{
  levelUp: []
}>()

const router = useRouter()

const progress = ref(props.initialProgress)
const timeLeft = ref(props.initialProgress === 100 ? 0 : props.collectionTime)
const upgradeProgress = ref(props.initialUpgradeProgress)
const upgradeTimeLeft = ref(
  props.initialUpgradeProgress === 100 ? 0 : props.upgradeDuration,
)

let resourceTimer: NodeJS.Timeout | null = null
let upgradeTimer: NodeJS.Timeout | null = null

const armoryIcon = '🗡️'
const armoryActionName = 'Создать'

const isArmory = computed(() => props.name === 'Арсенал')

const gradientClass = computed(() => {
  const baseColor = props.color.replace('bg-', '')
  const gradients: Record<string, string> = {
    cyan: 'from-cyan-900/50 via-cyan-800/30 to-cyan-900/50',
    emerald: 'from-emerald-900/50 via-emerald-800/30 to-emerald-900/50',
    yellow: 'from-yellow-900/50 via-yellow-800/30 to-yellow-900/50',
    orange: 'from-orange-900/50 via-orange-800/30 to-orange-900/50',
    slate: 'from-slate-800/50 via-slate-700/30 to-slate-800/50',
    red: 'from-red-900/50 via-red-800/30 to-red-900/50',
  }
  return (
    gradients[baseColor.split('-')[0]] ||
    'from-slate-900/50 via-slate-800/30 to-slate-900/50'
  )
})

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleCollect = () => {
  if (isArmory.value) {
    router.push('/armory')
    return
  }
  if (progress.value === 100) {
    progress.value = 0
    timeLeft.value = props.collectionTime
  }
}

const handleUpgrade = () => {
  if (upgradeProgress.value === 100) {
    upgradeProgress.value = 0
    upgradeTimeLeft.value = props.upgradeDuration
    emit('levelUp')
  }
}

// SVG иконка для кнопки улучшения
const UpgradeIcon = {
  template: `
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" transform="rotate(-90 12 12)" />
    </svg>
  `,
}

onMounted(() => {
  // Таймер для сбора ресурсов
  resourceTimer = setInterval(() => {
    const newProgress = Math.min(
      progress.value + 100 / props.collectionTime,
      100,
    )
    progress.value = newProgress
    timeLeft.value = Math.max(
      0,
      props.collectionTime - props.collectionTime * (newProgress / 100),
    )
  }, 1000)

  // Таймер для улучшения
  upgradeTimer = setInterval(() => {
    const newProgress = Math.min(
      upgradeProgress.value + 100 / props.upgradeDuration,
      100,
    )
    upgradeProgress.value = newProgress
    upgradeTimeLeft.value = Math.max(
      0,
      props.upgradeDuration - props.upgradeDuration * (newProgress / 100),
    )
  }, 1000)
})

onUnmounted(() => {
  if (resourceTimer) clearInterval(resourceTimer)
  if (upgradeTimer) clearInterval(upgradeTimer)
})
</script>

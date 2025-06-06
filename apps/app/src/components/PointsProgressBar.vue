<template>
  <div class="group relative h-6 w-full bg-black/40 rounded overflow-hidden">
    <!-- Фоновая полоса -->
    <div
      :class="`absolute top-0 left-0 h-full transition-all duration-300 ${color}`"
      :style="{ width: `${progress}%` }"
    >
      <!-- Блики -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] animate-[shine_2s_ease-in-out_infinite]"
      />
    </div>

    <!-- Метка и значение -->
    <div class="relative flex h-full items-center justify-between px-1">
      <div
        :class="`flex items-center gap-1 rounded px-1 ${labelClass || 'bg-black/60'}`"
      >
        <span class="text-sm">{{ icon }}</span>
      </div>

      <div v-if="showValue" class="flex items-center gap-0.5 text-xs">
        <span class="font-medium">{{ points }}</span>
        <span class="text-white/30 text-xs">/</span>
        <span class="text-white/50">{{ max }}</span>
      </div>
    </div>

    <!-- Всплывающая подсказка -->
    <div
      class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <div class="rounded bg-black/90 px-2 py-1 text-xs whitespace-nowrap">
        {{ percentage }}% ({{ points }} / {{ max }})
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  points: number
  color: string
  icon: string
  max?: number
  labelClass?: string
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 120,
  showValue: false,
})

const progress = computed(() => Math.min((props.points / props.max) * 100, 100))

const percentage = computed(() => Math.round(progress.value))
</script>

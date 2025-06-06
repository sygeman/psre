<template>
  <div class="relative flex flex-col items-center w-12">
    <div class="relative w-12 h-12">
      <button
        @click="onClick"
        :disabled="disabled"
        :class="[
          'w-full h-full rounded-full flex items-center justify-center transition-colors',
          pulseAnimation
            ? 'bg-slate-800/80 cursor-pointer ring-2 ring-white/20'
            : `bg-slate-900 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`,
        ]"
      >
        <span
          :class="`relative flex items-center justify-center w-8 h-8 rounded-full ${color}`"
        >
          <span
            v-if="pulseAnimation"
            class="absolute inset-0 rounded-full animate-[pulse_2s_ease-in-out_infinite]"
          />
          <span class="relative">
            <component :is="iconComponent" v-if="iconComponent" />
            <span v-else>{{ icon }}</span>
          </span>
        </span>

        <div
          v-if="timer"
          class="absolute inset-0 flex items-center justify-center text-xs text-white/60 bg-black/50 rounded-full z-20"
        >
          {{ timer }}
        </div>
      </button>
    </div>
    <span v-if="label" class="mt-1 text-xs text-white/60">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  onClick: (e: MouseEvent) => void
  disabled?: boolean
  color: string
  icon?: string
  iconComponent?: any
  label?: string
  timer?: string
  pulseAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  pulseAnimation: false,
})

// Определяем какой тип иконки использовать
const iconComponent = computed(() => {
  return props.iconComponent || null
})
</script>

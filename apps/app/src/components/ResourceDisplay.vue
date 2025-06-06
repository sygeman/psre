<template>
  <div
    class="relative flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 backdrop-blur-sm"
  >
    <!-- Градиентная обводка -->
    <div class="absolute inset-0 -z-10 rounded ring-1 ring-white/10" />

    <!-- Внутренний градиент -->
    <div
      class="absolute inset-0 -z-10 rounded bg-gradient-to-b from-white/5 to-transparent"
    />

    <span class="drop-shadow-glow">{{ icon || '💎' }}</span>
    <span class="font-medium text-slate-200">
      <AnimatedNumber :value="value" :compact="false" />
    </span>
  </div>
</template>

<script setup lang="ts">
import AnimatedNumber from './AnimatedNumber.vue'

interface Props {
  icon: string
  value: number
}

defineProps<Props>()
</script>

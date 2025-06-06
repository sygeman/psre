<template>
  <span>{{ formattedValue }}</span>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'

interface Props {
  value: number
  duration?: number
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  compact: false,
})

const compactFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
})

const standardFormatter = new Intl.NumberFormat('en-US')

const displayValue = ref(props.value)
const prevValue = ref(props.value)

const formattedValue = computed(() => {
  return props.compact
    ? compactFormatter.format(displayValue.value)
    : standardFormatter.format(displayValue.value)
})

watchEffect(() => {
  if (props.value === prevValue.value) return

  const start = prevValue.value
  const end = props.value
  const duration = props.duration
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Функция плавности (ease-out)
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    const current = start + (end - start) * easeProgress
    displayValue.value = Math.round(current)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  prevValue.value = props.value
  requestAnimationFrame(animate)
})
</script>

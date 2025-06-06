<template>
  <div
    :class="[
      'aspect-2/3 relative',
      heroStyle === 'red' && 'bg-red-900',
      heroStyle === 'green' && 'bg-green-900',
      heroStyle === 'yellow' && 'bg-yellow-900',
      heroStyle === 'purple' && 'bg-purple-900',
      heroStyle === 'blue' && 'bg-blue-900',
    ]"
  >
    <div
      class="top-0 ml-0.5 h-[calc(100%-28px)] w-[calc(100%-4px)] bg-black/90"
    />
    <div class="absolute bottom-12 left-1.5 font-bold">+{{ upgradeLevel }}</div>
    <div class="absolute right-1.5 bottom-12">Lv.{{ level }}</div>
    <div class="absolute bottom-8 left-0 flex w-full justify-center">
      <div class="flex -space-x-1">
        <StarIcon
          v-for="(star, index) in renderedStars"
          :key="index"
          :class="star.class"
        />
      </div>
    </div>
    <div class="absolute bottom-0 flex w-full items-center justify-center">
      <span class="absolute left-0 mx-0.5 flex bg-black/60 px-2">
        {{ type }}
      </span>
      <span class="py-1 text-sm">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StarIcon from './StarIcon.vue'

interface Props {
  name: string
  type: string
  heroStyle: 'red' | 'green' | 'yellow' | 'purple' | 'blue'
  level: number
  starLevel: number
  upgradeLevel: number
}

const props = defineProps<Props>()

const renderedStars = computed(() => {
  const redStars = Math.floor((props.starLevel - 1) / 5)
  const yellowStars = props.starLevel > 5 ? 5 : props.starLevel

  const stars = []

  if (redStars > 0) {
    for (let i = 0; i < redStars; i++) {
      stars.push({ class: 'size-4 text-red-500' })
    }
  } else {
    for (let i = 0; i < yellowStars; i++) {
      stars.push({ class: 'size-4 text-yellow-400' })
    }
  }

  return stars
})
</script>

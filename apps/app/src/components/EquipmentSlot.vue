<template>
  <div class="flex flex-col items-center gap-2">
    <div
      :class="[
        'relative flex size-16 items-center justify-center rounded',
        isEmpty ? 'bg-slate-800' : 'bg-slate-700',
      ]"
    >
      <div
        v-if="upgradeLevel !== undefined && !isEmpty"
        class="absolute top-1 left-1 text-xs font-bold text-white"
        style="
          text-shadow:
            -1px -1px 0 #0f172a,
            1px -1px 0 #0f172a,
            -1px 1px 0 #0f172a,
            1px 1px 0 #0f172a;
        "
      >
        +{{ upgradeLevel }}
      </div>

      <div
        v-if="canUpgrade && !isEmpty"
        class="absolute top-1 right-1 size-2 rounded-full bg-red-500"
      />

      <span class="text-2xl">{{ icon }}</span>

      <div v-if="!isEmpty && stars" class="absolute right-0 bottom-0 left-0">
        <div class="rounded-b bg-slate-900/80 py-0.5">
          <div class="flex justify-center">
            <div class="flex -space-x-0.5">
              <StarIcon
                v-for="(star, index) in renderedStars"
                :key="index"
                :class="star.class"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-sm text-slate-400">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StarIcon from './StarIcon.vue'

interface Props {
  icon: string
  label: string
  isEmpty?: boolean
  upgradeLevel?: number
  canUpgrade?: boolean
  stars?: number
}

const props = defineProps<Props>()

const renderedStars = computed(() => {
  if (!props.stars) return []

  const redStars = Math.floor((props.stars - 1) / 5)
  const yellowStars = props.stars > 5 ? 5 : props.stars

  const stars = []

  if (redStars > 0) {
    for (let i = 0; i < redStars; i++) {
      stars.push({ class: 'size-3 text-red-500' })
    }
  } else {
    for (let i = 0; i < yellowStars; i++) {
      stars.push({ class: 'size-3 text-yellow-400' })
    }
  }

  return stars
})
</script>

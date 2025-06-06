<template>
  <div class="w-24 text-sm backdrop-blur-sm">
    <div
      class="relative flex size-24 cursor-pointer bg-slate-700/80 transition-colors hover:bg-slate-600/80 overflow-hidden group"
      @click="navigateToPerson"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"
      />

      <CharacterAvatar class="size-24 relative z-10" />

      <div
        class="absolute top-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 z-20 backdrop-blur-sm border border-white/10 text-yellow-100 font-medium shadow-lg text-xs"
      >
        <AnimatedNumber :value="level" :compact="false" />
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>

    <div class="space-y-0.5 p-0.5">
      <PointsProgressBar
        :points="staminaPoints"
        icon="🔋"
        color="bg-gradient-to-r from-orange-600 to-orange-500"
        label-class="bg-orange-900/80"
        :show-value="true"
      />
      <PointsProgressBar
        :points="actionPoints"
        icon="⚡"
        color="bg-gradient-to-r from-blue-600 to-blue-500"
        label-class="bg-blue-900/80"
        :show-value="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AnimatedNumber from '@/components/AnimatedNumber.vue'
import PointsProgressBar from '@/components/PointsProgressBar.vue'
import CharacterAvatar from '@/components/CharacterAvatar.vue'

const router = useRouter()

// Замоканные данные
const level = ref(25)
const staminaPoints = ref(85)
const actionPoints = ref(92)

const navigateToPerson = () => {
  router.push('/person')
}
</script>

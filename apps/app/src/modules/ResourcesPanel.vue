<template>
  <div
    class="grid h-8 w-full grid-cols-5 px-4 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg"
  >
    <div
      v-for="(resource, key) in resources"
      :key="key"
      class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
      @click="navigateToShop"
    >
      <span class="flex-shrink-0">{{ resource.icon }}</span>
      <span class="truncate">
        <AnimatedNumber :value="resource.value" />
      </span>
      <span
        v-if="key === 'diamond'"
        class="inline-flex items-center font-bold text-yellow-400 flex-shrink-0"
      >
        +
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AnimatedNumber from '@/components/AnimatedNumber.vue'

const router = useRouter()

// Замоканные данные ресурсов
const resources = ref({
  food: {
    icon: '🌾',
    value: 125420,
  },
  wood: {
    icon: '🪵',
    value: 89650,
  },
  steel: {
    icon: '🔩',
    value: 45320,
  },
  fuel: {
    icon: '🛢️',
    value: 67890,
  },
  diamond: {
    icon: '💎',
    value: 1234,
  },
})

const navigateToShop = () => {
  router.push('/shop')
}
</script>

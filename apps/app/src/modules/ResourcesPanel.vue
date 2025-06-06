<template>
  <div
    class="grid h-8 w-full grid-cols-5 px-4 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg"
  >
    <div
      v-if="loading"
      class="col-span-5 flex items-center justify-center text-gray-400 text-xs"
    >
      Загрузка ресурсов...
    </div>
    <div
      v-else-if="error"
      class="col-span-5 flex items-center justify-center text-red-400 text-xs"
    >
      Ошибка загрузки ресурсов
    </div>
    <template v-else>
      <div
        v-for="resource in displayResources"
        :key="resource.type"
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        @click="navigateToShop"
      >
        <span class="flex-shrink-0">{{ resource.icon }}</span>
        <span class="truncate">
          <AnimatedNumber :value="resource.amount" />
        </span>
        <span
          v-if="resource.type === 'diamond'"
          class="inline-flex items-center font-bold text-yellow-400 flex-shrink-0"
        >
          +
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useSubscription } from '@vue/apollo-composable'
import AnimatedNumber from '@/components/AnimatedNumber.vue'
import {
  GetPlayerResourcesDocument,
  PlayerResourcesUpdatedDocument,
} from '@/graphql/generated'

const router = useRouter()

// ID игрока (в реальном приложении получается из контекста аутентификации)
const playerId = 'player-123'

// Основной запрос для получения ресурсов
const { result, loading, error, refetch } = useQuery(
  GetPlayerResourcesDocument,
  {
    playerId,
  },
)

// Подписка на обновления ресурсов
const { result: subscriptionResult } = useSubscription(
  PlayerResourcesUpdatedDocument,
  {
    playerId,
  },
)

// Вычисляемое свойство для отображения ресурсов в нужном порядке
const displayResources = computed(() => {
  const playerResources = result.value?.playerResources
  if (!playerResources?.resources) return []

  // Порядок отображения ресурсов
  const resourceOrder = ['food', 'wood', 'steel', 'fuel', 'diamond']

  return resourceOrder
    .map((type) => playerResources.resources.find((r) => r.type === type))
    .filter(Boolean)
})

// Обработка обновлений по подписке
const handleSubscriptionUpdate = () => {
  if (subscriptionResult.value?.playerResourcesUpdated) {
    // Обновляем данные через refetch чтобы синхронизировать с подпиской
    refetch()
  }
}

const navigateToShop = () => {
  router.push('/shop')
}

onMounted(() => {
  // Отслеживаем изменения в подписке
  if (subscriptionResult) {
    handleSubscriptionUpdate()
  }
})

onUnmounted(() => {
  // Очистка подписок выполняется автоматически Vue Apollo
})
</script>

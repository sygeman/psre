<template>
  <div
    class="relative w-full cursor-pointer overflow-hidden select-none"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="relative overflow-hidden bg-slate-800/80 backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:border-t before:border-white/10"
    >
      <div class="py-2">
        <div class="relative h-[44px]">
          <div
            class="absolute inset-0 transition-transform duration-300 ease-out"
            :style="{
              'z-index': activeChannel === 'region' ? 2 : 1,
              transform: `translateX(${activeChannel === 'region' ? '0' : '-100%'})`,
            }"
          >
            <MessageContainer
              channel="region"
              :messages="regionMessages"
              :active-channel="activeChannel"
            />
          </div>
          <div
            class="absolute inset-0 transition-transform duration-300 ease-out"
            :style="{
              'z-index': activeChannel === 'alliance' ? 2 : 1,
              transform: `translateX(${activeChannel === 'alliance' ? '0' : '100%'})`,
            }"
          >
            <MessageContainer
              channel="alliance"
              :messages="allianceMessages"
              :active-channel="activeChannel"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MessageContainer from './MessageContainer.vue'

type ChatChannel = 'region' | 'alliance'

interface Message {
  id: string
  author: string
  text: string
  channel: ChatChannel
}

const router = useRouter()

// Моковые данные чата
const activeChannel = ref<ChatChannel>('region')
const touchStart = ref(0)
const isAnimating = ref(false)
const messages = ref<Message[]>([
  { id: '1', author: 'Игрок1', text: 'Привет всем!', channel: 'region' },
  { id: '2', author: 'Игрок2', text: 'Как дела?', channel: 'region' },
  {
    id: '3',
    author: 'Союзник1',
    text: 'Готовимся к атаке',
    channel: 'alliance',
  },
  {
    id: '4',
    author: 'Союзник2',
    text: 'Нужна помощь с ресурсами',
    channel: 'alliance',
  },
])

const regionMessages = computed(() =>
  messages.value.filter((m) => m.channel === 'region').slice(-2),
)

const allianceMessages = computed(() =>
  messages.value.filter((m) => m.channel === 'alliance').slice(-2),
)

const handleClick = () => {
  router.push({
    path: '/chat',
    state: { activeChannel: activeChannel.value },
  })
}

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault() // Предотвращаем скролл страницы при свайпе
}

const handleTouchEnd = (e: TouchEvent) => {
  e.preventDefault() // Предотвращаем открытие страницы после свайпа
  const touchEnd = e.changedTouches[0].clientX
  const diff = touchEnd - touchStart.value

  if (Math.abs(diff) > 50 && !isAnimating.value) {
    isAnimating.value = true
    if (diff > 0 && activeChannel.value === 'alliance') {
      activeChannel.value = 'region'
    } else if (diff < 0 && activeChannel.value === 'region') {
      activeChannel.value = 'alliance'
    }
    setTimeout(() => (isAnimating.value = false), 300)
  } else if (Math.abs(diff) <= 5) {
    // Если это был клик (очень маленькое движение), а не свайп
    handleClick()
  }
}
</script>

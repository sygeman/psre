<template>
  <div class="flex min-w-0">
    <div
      class="ml-2 flex h-[44px] w-[44px] flex-shrink-0 flex-col items-center"
    >
      <div
        class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 before:absolute before:inset-0 before:rounded-full before:border before:border-white/20 relative"
      >
        <span class="text-gray-200/90">
          {{ channel === 'region' ? '🌍' : '👥' }}
        </span>
      </div>
      <!-- Индикаторы каналов под иконкой -->
      <div class="mt-1 flex gap-1">
        <div
          :class="[
            'h-1.5 w-1.5 rounded-full transition-colors',
            activeChannel === 'region' ? 'bg-blue-500' : 'bg-slate-600',
          ]"
        />
        <div
          :class="[
            'h-1.5 w-1.5 rounded-full transition-colors',
            activeChannel === 'alliance' ? 'bg-blue-500' : 'bg-slate-600',
          ]"
        />
      </div>
    </div>
    <div class="ml-2 max-w-[calc(100%-60px)] min-w-0 flex-1 space-y-0.5 pr-2">
      <div
        v-if="messages.length > 0"
        v-for="message in messages"
        :key="message.id"
        class="max-w-full min-w-0 text-sm leading-[22px] text-gray-400/90 flex"
      >
        <span class="font-medium select-none text-gray-200/90 flex-shrink-0"
          >{{ message.author }}:</span
        >
        <span class="select-none truncate ml-1">{{ message.text }}</span>
      </div>
      <div v-else class="flex h-[44px] items-center justify-center">
        <p class="text-xs text-gray-500/80 select-none">Нет сообщений</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  author: string
  text: string
  channel: string
}

interface Props {
  channel: 'region' | 'alliance'
  messages: Message[]
  activeChannel: 'region' | 'alliance'
}

defineProps<Props>()
</script>

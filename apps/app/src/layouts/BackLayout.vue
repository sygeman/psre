<template>
  <div class="relative flex h-screen flex-col">
    <ToastNotifications />
    <div
      class="relative flex h-14 shrink-0 items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-b border-white/10"
    >
      <BackButton />
      <div class="absolute left-1/2 -translate-x-1/2 text-lg font-medium">
        {{ title }}
      </div>
      <div v-if="$slots.rightContent">
        <slot name="rightContent" />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
    <div v-if="$slots.bottomContent" class="flex-shrink-0">
      <slot name="bottomContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from '@/modules/BackButton.vue'
import ToastNotifications from '@/components/ToastNotifications.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div :class="['absolute -top-1.5 -right-2.5', customClass]">
    <!-- Внешняя обводка с размытием -->
    <div class="absolute inset-0 rounded-full bg-blue-400/50 blur-sm" />
    <!-- Основной индикатор -->
    <div
      class="relative flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 px-1.5 text-[11px] font-bold text-white shadow-lg shadow-blue-500/30 ring-2 ring-slate-900/90"
    >
      <div class="animate-pulse drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NotificationBadgeProps {
  count: number
  customClass?: string
}

defineProps<NotificationBadgeProps>()
</script>

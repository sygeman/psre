<template>
  <div class="relative flex h-screen flex-col">
    <div
      class="absolute top-8 w-full h-[calc(100%-64px-32px)] overflow-hidden z-0"
    >
      <slot />
    </div>
    <!-- <ToastNotifications /> -->
    <div class="absolute top-0 w-full flex shrink-0 z-10">
      <ResourcesPanel />
    </div>
    <div class="absolute top-8 flex shrink-0 z-10">
      <PersonPanel />
    </div>
    <div class="absolute top-8 left-24 flex shrink-0 z-10">
      <PowerPanel />
    </div>
    <div class="absolute top-10 right-2 flex shrink-0 z-10">
      <!-- <MiniGamesButton /> -->
    </div>
    <div class="absolute bottom-16 w-full z-10">
      <!-- <MiniChat /> -->
    </div>
    <div class="absolute bottom-0 w-full z-10">
      <BottomMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomMenu from '@/modules/BottomMenu.vue'
import PersonPanel from '@/modules/PersonPanel.vue'
import PowerPanel from '@/modules/PowerPanel.vue'
import ResourcesPanel from '@/modules/ResourcesPanel.vue'
// import { MiniChat } from '@/components/mini-chat'
// import { ToastNotifications } from '@/components/toast-notifications'
// import { MiniGamesButton } from '@/components/mini-games-button'
</script>

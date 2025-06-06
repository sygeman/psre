<template>
  <div class="flex gap-1">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="[
        'cursor-pointer rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
        tab.id === activeTab
          ? 'bg-slate-700 text-white'
          : 'text-slate-400 hover:text-slate-200',
      ]"
      @click="() => onTabChange(tab.id)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from './Tabs.vue'

interface Props {
  tabs: Tab[]
  activeTab: Tab['id']
  onTabChange: (id: Tab['id']) => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex bg-slate-800">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="[
        'flex h-10 flex-1 cursor-pointer items-center justify-center text-sm font-medium',
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
export interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: Tab['id']
  onTabChange: (id: Tab['id']) => void
}

defineProps<Props>()
</script>

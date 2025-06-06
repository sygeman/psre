<template>
  <BackLayout title="Испытай удачу">
    <template #rightContent>
      <div class="px-2">
        <ResourceDisplay icon="💎" :value="diamond" />
      </div>
    </template>
    <SlotMachinePage />
  </BackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import SlotMachinePage from '@/components/SlotMachinePage.vue'
import ResourceDisplay from '@/components/ResourceDisplay.vue'

// Моковые данные
const diamond = ref(1234)
</script>

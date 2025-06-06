<template>
  <BackLayout title="Герои">
    <template #rightContent>
      <div class="px-2">
        <ResourceDisplay icon="🧪" :value="serum" />
      </div>
    </template>
    <div>
      <div class="h-12 w-full" />
      <div class="grid grid-cols-4 gap-2 px-2">
        <HeroCard
          name="Hero 1"
          :level="40"
          :star-level="2"
          :upgrade-level="1"
          hero-style="green"
          type="F"
        />
        <HeroCard
          name="Hero 2"
          :level="3"
          :star-level="4"
          :upgrade-level="2"
          hero-style="red"
          type="S"
        />
        <HeroCard
          name="Hero 3"
          :level="123"
          :star-level="5"
          :upgrade-level="7"
          hero-style="yellow"
          type="R"
        />
        <HeroCard
          name="Hero 4"
          :level="230"
          :star-level="6"
          :upgrade-level="8"
          hero-style="blue"
          type="E"
        />
        <HeroCard
          name="Hero 5"
          :level="320"
          :star-level="6"
          :upgrade-level="5"
          hero-style="purple"
          type="R"
        />
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import HeroCard from '@/components/HeroCard.vue'
import ResourceDisplay from '@/components/ResourceDisplay.vue'

// Моковые данные
const serum = ref(89)
</script>

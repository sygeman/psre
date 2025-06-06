<template>
  <BuildingButton
    :onClick="() => router.push('/mini-games')"
    color="bg-purple-500"
    icon="🎮"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BuildingButton from './BuildingButton.vue'

const router = useRouter()
</script>

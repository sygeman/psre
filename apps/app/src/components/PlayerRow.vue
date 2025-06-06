<template>
  <div
    class="flex items-center h-12 px-4 text-sm transition-colors hover:bg-slate-800/30"
  >
    <div class="w-10 text-center text-slate-400">{{ player.id }}</div>
    <div class="w-10 flex justify-center">
      <CharacterAvatar :size="24" />
    </div>
    <div class="flex-1 pl-4">
      <div class="font-medium text-slate-200">{{ player.name }}</div>
      <div v-if="player.alliance" class="text-xs text-slate-400">
        {{ player.alliance }}
      </div>
    </div>
    <div class="text-slate-300 font-medium">
      <AnimatedNumber :value="player.power" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterAvatar from './CharacterAvatar.vue'
import AnimatedNumber from './AnimatedNumber.vue'

interface Player {
  id: number
  name: string
  alliance: string | null
  power: number
}

interface Props {
  player: Player
}

defineProps<Props>()
</script>

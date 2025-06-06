<template>
  <BackLayout title="Личный Ранг по Мощи">
    <template #bottomContent>
      <div class="sticky bottom-0 border-t border-white/5 backdrop-blur-[2px]">
        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-50/5 via-white/[0.15] to-slate-50/5"
        />
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]"
        />
        <div class="absolute inset-0 bg-slate-950/40" />
        <PlayerRow :player="currentPlayer" />
      </div>
    </template>

    <div class="flex flex-col h-full">
      <div
        class="flex h-10 shrink-0 items-center border-b border-slate-700/50 px-4 text-xs text-slate-400 sticky top-0 z-20 backdrop-blur-[2px]"
      >
        <div class="absolute inset-0 bg-slate-950/40" />
        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-50/5 via-white/[0.15] to-slate-50/5"
        />
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_70%)]"
        />
        <div class="w-10 text-center relative z-10">Ранг</div>
        <div class="w-10 relative z-10" />
        <div class="flex-1 pl-4 relative z-10">Командир</div>
        <div class="relative z-10">Мощь</div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="divide-y divide-slate-700/25">
          <PlayerRow
            v-for="player in players"
            :key="player.id"
            :player="player"
          />
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BackLayout from '@/layouts/BackLayout.vue'
import AnimatedNumber from '@/components/AnimatedNumber.vue'
import CharacterAvatar from '@/components/CharacterAvatar.vue'
import PlayerRow from '@/components/PlayerRow.vue'

interface Player {
  id: number
  name: string
  alliance: string | null
  power: number
}

// Генерация моковых данных игроков
const players = ref<Player[]>(
  Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Игрок ${index + 1}`,
    alliance: index % 5 === 0 ? null : `Альянс ${Math.floor(index / 5) + 1}`,
    power: Math.floor(1000000 * Math.pow(0.99, index)), // Экспоненциальное уменьшение мощи
  })),
)

// Текущий игрок (первое место)
const currentPlayer = ref<Player>({
  id: 1,
  name: 'Игрок 1',
  alliance: 'Альянс 1',
  power: 1000000,
})

// Заменяем первого игрока в списке на текущего игрока
players.value[0] = currentPlayer.value
</script>

<template>
  <div
    class="grid h-16 w-full grid-cols-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-t border-white/10"
  >
    <router-link
      :to="isHome ? '/region' : '/'"
      class="relative flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <div class="absolute inset-0 bg-yellow-800/70" />
      <div class="relative flex flex-col items-center gap-1">
        <component
          :is="isHome ? GlobeAltIcon : HomeIcon"
          class="h-6 w-6 text-yellow-100"
        />
        <div class="text-xs text-yellow-100">
          {{ isHome ? 'Мир' : 'Домой' }}
        </div>
      </div>
    </router-link>

    <router-link
      to="/quests"
      class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <div class="relative">
        <ClipboardDocumentListIcon class="h-6 w-6 text-slate-400" />
        <NotificationBadge
          v-if="questsAvailableCount > 0"
          :count="questsAvailableCount"
        />
      </div>
      <div class="text-xs">Квесты</div>
    </router-link>

    <router-link
      to="/heroes"
      class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <UserCircleIcon class="h-6 w-6 text-slate-400" />
      <div class="text-xs">Герои</div>
    </router-link>

    <router-link
      to="/mail"
      class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <div class="relative">
        <EnvelopeOpenIcon class="h-6 w-6 text-slate-400" />
        <NotificationBadge
          v-if="mailUnreadCount > 0"
          :count="mailUnreadCount"
        />
      </div>
      <div class="text-xs">Почта</div>
    </router-link>

    <router-link
      to="/alliance"
      class="relative flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <div
        v-if="allianceHelpAvailable > 0"
        class="absolute -top-14 left-1/2 -translate-x-1/2 cursor-pointer"
        @click.prevent.stop="handleAllianceHelpClick"
      >
        <div class="relative flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <div
              class="rounded-full bg-slate-800/95 px-3 py-2 shadow-lg border-[3px] border-blue-500/50 backdrop-blur-sm"
            >
              <span class="text-xl relative">
                🤝
                <NotificationBadge
                  :count="allianceHelpAvailable"
                  class="!-right-4 !-top-3.5"
                />
              </span>
            </div>
          </div>
          <ChevronDownIcon class="h-4 w-4 text-blue-500/50 -mt-1" />
        </div>
      </div>

      <div class="relative">
        <UserGroupIcon class="h-6 w-6 text-slate-400" />
        <NotificationBadge :count="5" />
      </div>
      <div class="text-xs">Альянс</div>
    </router-link>

    <router-link
      to="/rank"
      class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
    >
      <TrophyIcon class="h-6 w-6 text-slate-400" />
      <div class="text-xs">Ранги</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  GlobeAltIcon,
  TrophyIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  EnvelopeOpenIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import NotificationBadge from '@/components/NotificationBadge.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')

// Локальное состояние вместо сторов
const mailUnreadCount = ref(0)
const questsAvailableCount = ref(0)
const allianceHelpAvailable = ref(0)

const handleAllianceHelpClick = () => {
  allianceHelpAvailable.value = 0
}
</script>

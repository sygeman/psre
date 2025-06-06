<template>
  <button
    class="group relative flex h-full aspect-square cursor-pointer items-center justify-center transition-all active:translate-y-[1px]"
    @click="goBack"
  >
    <!-- Эффект при наведении -->
    <div
      class="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    />

    <!-- Разделитель справа -->
    <div class="absolute right-0 h-full w-[1px] bg-slate-700" />
    <div class="absolute right-[1px] h-full w-[1px] bg-black/20" />

    <!-- Иконка -->
    <svg
      class="relative z-10 size-5 text-slate-300 transition-colors duration-200 group-hover:text-slate-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

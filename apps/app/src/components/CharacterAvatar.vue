<template>
  <div :class="`relative ${$attrs.class || ''}`">
    <!-- Внешнее свечение -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"
    />

    <!-- Градиентная рамка -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 p-[2px]"
    >
      <div class="h-full w-full bg-slate-900">
        <img
          src="/avatar.webp"
          alt="Character Avatar"
          class="h-full w-full object-cover"
          @error="handleImageError"
        />
      </div>
    </div>

    <!-- Блики на рамке -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
      />
      <div
        class="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 bg-white/10 blur-xl rounded-full animate-[pulse_4s_ease-in-out_infinite]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const handleImageError = (event: Event) => {
  // Если изображение не загрузилось, можно установить fallback
  const img = event.target as HTMLImageElement
  img.src = '/avatar-fallback.png'
}
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md mb-5">
      <div class="max-w-4xl mx-auto py-5 px-5">
        <h1 class="text-center text-gray-800 text-2xl font-semibold m-0">GraphQL Тест Приложение</h1>
      </div>
    </header>
    
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="border-b">
      <div class="max-w-6xl mx-auto py-4 px-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">PSRE Vue App</h1>

          <nav class="flex gap-2">
            <Button variant="ghost" as-child>
              <RouterLink to="/">Главная</RouterLink>
            </Button>
            <Button variant="ghost" as-child>
              <RouterLink to="/graphql">GraphQL</RouterLink>
            </Button>
            <Button variant="ghost" as-child>
              <RouterLink to="/shadcn">Shadcn UI</RouterLink>
            </Button>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Добро пожаловать в PSRE Vue App</h1>
      <p class="text-xl text-muted-foreground mb-8">
        Современное приложение на Vue 3 с GraphQL, Tailwind CSS и Shadcn UI
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>GraphQL интеграция</CardTitle>
          <CardDescription
            >Типизированные запросы, мутации и подписки</CardDescription
          >
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Полностью настроенный GraphQL CodeGen с автоматической генерацией
            типизированных composables для Vue Apollo.
          </p>
          <Button as-child>
            <RouterLink to="/graphql">Смотреть демо</RouterLink>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shadcn UI компоненты</CardTitle>
          <CardDescription
            >Красивые, доступные и переиспользуемые компоненты</CardDescription
          >
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground mb-4">
            Современная библиотека компонентов, построенная на Tailwind CSS с
            полной поддержкой темной темы.
          </p>
          <Button variant="outline" as-child>
            <RouterLink to="/shadcn">Посмотреть компоненты</RouterLink>
          </Button>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Возможности проекта</CardTitle>
        <CardDescription>Что включено в этот стартовый проект</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">Vue 3 + TypeScript</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">GraphQL CodeGen</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">Tailwind CSS</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">Shadcn UI</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">Vue Apollo</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span class="text-sm">Vite + ESLint</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

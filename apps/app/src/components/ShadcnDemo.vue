<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">Shadcn UI Demo</h1>
      <p class="text-muted-foreground text-lg">
        Демонстрация основных компонентов Shadcn UI для Vue
      </p>
    </div>

    <!-- Кнопки -->
    <Card>
      <CardHeader>
        <CardTitle>Кнопки</CardTitle>
        <CardDescription>Различные варианты кнопок</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex gap-3 flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div class="flex gap-3 flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </CardContent>
    </Card>

    <!-- Формы -->
    <Card>
      <CardHeader>
        <CardTitle>Формы</CardTitle>
        <CardDescription>Инпуты, лейблы и текстовые области</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>

          <div class="space-y-2">
            <Label for="password">Пароль</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="message">Сообщение</Label>
          <Textarea
            id="message"
            placeholder="Напишите ваше сообщение здесь..."
            rows="4"
          />
        </div>

        <Button class="w-full">Отправить</Button>
      </CardContent>
    </Card>

    <!-- Карточки с разным содержимым -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Проект Alpha</CardTitle>
          <CardDescription>Веб-приложение на Vue 3</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Современное веб-приложение с использованием Vue 3, Tailwind CSS и
            GraphQL.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">Подробнее</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Gateway</CardTitle>
          <CardDescription>Микросервисная архитектура</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Высокопроизводительный API gateway для управления микросервисами.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">Подробнее</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mobile App</CardTitle>
          <CardDescription>Кроссплатформенное приложение</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Мобильное приложение для iOS и Android с единой кодовой базой.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">Подробнее</Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Статистика -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-2xl font-bold">2.6K</div>
          <p class="text-xs text-muted-foreground">Пользователей</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-2xl font-bold">1.3K</div>
          <p class="text-xs text-muted-foreground">Продаж</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-2xl font-bold">98.5%</div>
          <p class="text-xs text-muted-foreground">Uptime</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-2xl font-bold">4.7</div>
          <p class="text-xs text-muted-foreground">Рейтинг</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

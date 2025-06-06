<template>
  <BackLayout title="Настройки">
    <div class="flex h-full flex-col">
      <div class="flex-1 overflow-y-auto">
        <div class="space-y-6 p-4">
          <!-- Аккаунт -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Аккаунт</h3>

            <div class="space-y-3">
              <button
                class="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                @click="logout"
              >
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BackLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackLayout from '@/layouts/BackLayout.vue'

const router = useRouter()

const logout = () => {
  if (confirm('Вы уверены, что хотите выйти?')) {
    // Логика выхода из аккаунта
    console.log('Выход из аккаунта')
    // Можно добавить редирект на страницу входа или очистку локального хранилища
    // router.push('/login')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-5">
    <h2 class="text-center text-gray-800 mb-8 text-2xl font-semibold">Тест комментариев с GraphQL</h2>
    
    <!-- Загрузка -->
    <div v-if="loading && !comments.length" class="text-center py-5 text-lg text-blue-600">
      Загружаем комментарии...
    </div>

    <!-- Ошибка -->
    <div v-if="error" class="bg-red-100 border border-red-300 text-red-800 p-4 rounded mb-5">
      Ошибка: {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, markRaw } from 'vue'
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable'

// Типы
interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

// GraphQL запросы
const GET_COMMENTS = gql`
  query GetComments {
    comments
  }
`
// Используем Vue Apollo Composables
const { result, loading, error } = useQuery(GET_COMMENTS)

// Реактивные переменные
const comments = computed(() => result.value?.comments || [])
</script> 
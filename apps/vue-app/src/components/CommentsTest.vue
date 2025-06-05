<template>
  <div class="max-w-4xl mx-auto p-5">
    <h2 class="text-center text-gray-800 mb-8 text-2xl font-semibold">Тест комментариев с GraphQL</h2>
    
    <!-- Форма добавления комментария -->
    <div class="mb-8 p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="text-gray-700 mb-5 text-lg font-medium">Добавить комментарий</h3>
      <form @submit.prevent="addComment" class="space-y-4">
        <div>
          <label for="author" class="block mb-1 font-semibold text-gray-700">Автор:</label>
          <input
            id="author"
            v-model="newComment.author"
            type="text"
            required
            placeholder="Введите имя автора"
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label for="content" class="block mb-1 font-semibold text-gray-700">Содержание:</label>
          <textarea
            id="content"
            v-model="newComment.content"
            required
            placeholder="Введите текст комментария"
            rows="3"
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          ></textarea>
        </div>
        <button 
          type="submit" 
          :disabled="mutationLoading"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 px-5 rounded transition-colors duration-200"
        >
          {{ mutationLoading ? 'Добавляется...' : 'Добавить комментарий' }}
        </button>
      </form>
    </div>

    <!-- Загрузка -->
    <div v-if="loading && !comments.length" class="text-center py-5 text-lg text-blue-600">
      Загружаем комментарии...
    </div>

    <!-- Ошибка -->
    <div v-if="error || mutationError" class="bg-red-100 border border-red-300 text-red-800 p-4 rounded mb-5">
      Ошибка: {{ (error || mutationError)?.message }}
    </div>

    <!-- Список комментариев -->
    <div class="comments-list">
      <h3 class="text-gray-700 mb-5 text-lg font-medium">Комментарии ({{ comments.length }})</h3>
      <div v-if="!comments.length && !loading" class="text-center py-10 text-gray-500 italic">
        Комментариев пока нет
      </div>
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="border border-gray-300 rounded-lg p-4 mb-4 bg-white transition-all duration-300"
        :class="{ 
          'border-green-500 bg-green-50 transform scale-105': isNewComment(comment.id),
          'hover:shadow-md': !isNewComment(comment.id)
        }"
      >
        <div class="flex justify-between items-center mb-3">
          <strong class="text-blue-600 font-semibold">{{ comment.author }}</strong>
          <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <div class="leading-relaxed whitespace-pre-wrap text-gray-800">{{ comment.content }}</div>
      </div>
    </div>

    <!-- Статус подписки -->
    <div class="fixed bottom-5 right-5 px-4 py-2 rounded text-xs font-semibold">
      <span 
        :class="subscriptionConnected 
          ? 'bg-green-100 text-green-800 border border-green-300' 
          : 'bg-red-100 text-red-800 border border-red-300'"
        class="px-3 py-1 rounded"
      >
        Подписка: {{ subscriptionConnected ? 'подключена' : 'отключена' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { gql } from '@apollo/client/core'
import { useQuery, useMutation, useSubscription } from '@vue/apollo-composable'

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
    comments {
      id
      author
      content
      createdAt
    }
  }
`

const ADD_COMMENT = gql`
  mutation AddComment($author: String!, $content: String!) {
    addComment(author: $author, content: $content) {
      id
      author
      content
      createdAt
    }
  }
`

const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded {
    commentAdded {
      id
      author
      content
      createdAt
    }
  }
`

// Используем Vue Apollo Composables
const { result, loading, error, refetch } = useQuery(GET_COMMENTS, {}, {
  fetchPolicy: 'cache-and-network'
})

const { mutate: addCommentMutation, loading: mutationLoading, error: mutationError } = useMutation(ADD_COMMENT)

const { result: subscriptionResult, start: startSubscription, stop: stopSubscription } = useSubscription(COMMENT_ADDED_SUBSCRIPTION)

// Реактивные переменные
const comments = computed(() => result.value?.comments || [])
const subscriptionConnected = ref(false)
const newCommentIds = ref<Set<string>>(new Set())

const newComment = ref({
  author: '',
  content: ''
})

// Методы
const addComment = async () => {
  if (!newComment.value.author.trim() || !newComment.value.content.trim()) {
    return
  }

  try {
    const result = await addCommentMutation({
      author: newComment.value.author.trim(),
      content: newComment.value.content.trim()
    })

    // Очищаем форму
    newComment.value = { author: '', content: '' }
    
    console.log('Комментарий добавлен:', result?.data?.addComment)
    
    // Обновляем список комментариев
    await refetch()
  } catch (err) {
    console.error('Ошибка добавления комментария:', err)
  }
}

const isNewComment = (commentId: string) => {
  return newCommentIds.value.has(commentId)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU')
}

// Обработка подписки
watch(subscriptionResult, (newResult) => {
  if (newResult?.commentAdded) {
    subscriptionConnected.value = true
    const newCommentData = newResult.commentAdded
    
    // Проверяем, что комментарий еще не существует в списке
    const exists = comments.value.some((c: Comment) => c.id === newCommentData.id)
    if (!exists) {
      // Помечаем как новый комментарий
      newCommentIds.value.add(newCommentData.id)
      // Убираем метку через 3 секунды
      setTimeout(() => {
        newCommentIds.value.delete(newCommentData.id)
      }, 3000)
      
      // Обновляем список комментариев
      refetch()
    }
  }
}, { immediate: true })

// Запускаем подписку при монтировании
startSubscription()

// Останавливаем подписку при демонтировании (автоматически)
</script> 
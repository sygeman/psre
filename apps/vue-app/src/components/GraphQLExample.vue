<template>
  <div class="p-5 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">GraphQL Example</h2>

    <!-- Показываем загрузку комментариев -->
    <div class="mb-8 p-4 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold mb-3">Комментарии:</h3>
      <div v-if="commentsLoading" class="text-blue-600">Загрузка...</div>
      <div v-else-if="commentsError" class="text-red-600">
        Ошибка: {{ commentsError.message }}
      </div>
      <ul v-else class="list-disc pl-5 space-y-1">
        <li v-for="comment in comments" :key="comment">{{ comment }}</li>
      </ul>
    </div>

    <!-- Форма для добавления комментария -->
    <div class="mb-8 p-4 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold mb-3">Добавить комментарий:</h3>
      <form @submit.prevent="handleAddComment" class="flex gap-3 flex-wrap">
        <input
          v-model="newComment"
          type="text"
          placeholder="Введите комментарий"
          required
          class="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model.number="postId"
          type="number"
          placeholder="ID поста"
          required
          class="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          :disabled="addCommentLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ addCommentLoading ? 'Добавление...' : 'Добавить' }}
        </button>
      </form>
      <div v-if="addCommentError" class="text-red-600 mt-3">
        Ошибка добавления: {{ addCommentError.message }}
      </div>
    </div>

    <!-- Подписка на новые комментарии -->
    <div class="p-4 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold mb-3">Новые комментарии (подписка):</h3>
      <div v-if="subscriptionData" class="text-green-600 font-medium">
        {{ subscriptionData.commentAdded }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useCommentAddedSubscription,
} from '@/graphql/generated'

// Состояние формы
const newComment = ref('')
const postId = ref(1)

// Query для получения комментариев
const {
  result: commentsResult,
  loading: commentsLoading,
  error: commentsError,
} = useGetCommentsQuery()
const comments = computed(() => commentsResult.value?.comments ?? [])

// Mutation для добавления комментария
const {
  mutate: addCommentMutate,
  loading: addCommentLoading,
  error: addCommentError,
} = useAddCommentMutation()

// Subscription для получения новых комментариев
const { result: subscriptionResult } = useCommentAddedSubscription()
const subscriptionData = computed(() => subscriptionResult.value)

// Обработчик добавления комментария
const handleAddComment = async () => {
  try {
    await addCommentMutate({
      postId: postId.value,
      comment: newComment.value,
    })
    newComment.value = ''
    // Можно добавить рефетч комментариев или использовать cache update
  } catch (error) {
    console.error('Ошибка добавления комментария:', error)
  }
}
</script>

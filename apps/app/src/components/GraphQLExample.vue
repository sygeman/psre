<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <h2 class="text-3xl font-bold">GraphQL Example</h2>

    <!-- Показываем загрузку комментариев -->
    <Card>
      <CardHeader>
        <CardTitle>Комментарии</CardTitle>
        <CardDescription
          >Список всех комментариев из GraphQL API</CardDescription
        >
      </CardHeader>
      <CardContent>
        <div v-if="commentsLoading" class="text-muted-foreground">
          Загрузка...
        </div>
        <div v-else-if="commentsError" class="text-destructive">
          Ошибка: {{ commentsError.message }}
        </div>
        <ul v-else class="space-y-2">
          <li
            v-for="comment in comments"
            :key="comment"
            class="p-2 bg-muted rounded"
          >
            {{ comment }}
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Форма для добавления комментария -->
    <Card>
      <CardHeader>
        <CardTitle>Добавить комментарий</CardTitle>
        <CardDescription
          >Создайте новый комментарий через GraphQL mutation</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleAddComment" class="space-y-4">
          <div class="space-y-2">
            <Label for="comment">Комментарий</Label>
            <Textarea
              id="comment"
              v-model="newComment"
              placeholder="Введите ваш комментарий..."
              required
            />
          </div>

          <Button type="submit" :disabled="addCommentLoading" class="w-full">
            {{ addCommentLoading ? 'Добавление...' : 'Добавить комментарий' }}
          </Button>
        </form>

        <div
          v-if="addCommentError"
          class="text-destructive mt-4 p-3 bg-destructive/10 rounded"
        >
          Ошибка добавления: {{ addCommentError.message }}
        </div>
      </CardContent>
    </Card>

    <!-- Подписка на новые комментарии -->
    <Card>
      <CardHeader>
        <CardTitle>Подписка на комментарии</CardTitle>
        <CardDescription
          >Новые комментарии в реальном времени через GraphQL
          subscription</CardDescription
        >
      </CardHeader>
      <CardContent>
        <div
          v-if="subscriptionData"
          class="p-4 bg-accent border border-border rounded-lg"
        >
          <p class="text-accent-foreground font-medium">Новый комментарий:</p>
          <p class="text-foreground">{{ subscriptionData.commentAdded }}</p>
        </div>
        <div v-else class="text-muted-foreground">
          Ожидание новых комментариев...
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useCommentAddedSubscription,
} from '@/graphql/generated'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Состояние формы
const newComment = ref('')

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
      comment: newComment.value,
    })
    newComment.value = ''
    // Можно добавить рефетч комментариев или использовать cache update
  } catch (error) {
    console.error('Ошибка добавления комментария:', error)
  }
}
</script>

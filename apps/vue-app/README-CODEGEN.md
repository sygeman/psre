# GraphQL CodeGen для Vue

Этот проект настроен для автоматической генерации TypeScript типов и Vue composables на основе GraphQL схемы.

## Что установлено

- `@graphql-codegen/cli` - основной CLI инструмент
- `@graphql-codegen/typescript` - генерация TypeScript типов
- `@graphql-codegen/typescript-operations` - генерация типов для операций
- `@graphql-codegen/typescript-vue-apollo` - генерация Vue composables

## Конфигурация

Конфигурация находится в файле `codegen.yml`:

```yaml
schema: '../api-gql/schema.gql' # Путь к GraphQL схеме
documents:
  - 'src/**/*.vue' # Vue компоненты
  - 'src/**/*.ts' # TypeScript файлы
  - 'src/**/*.graphql' # GraphQL файлы
  - 'src/**/*.gql' # GQL файлы
generates:
  src/graphql/generated.ts: # Выходной файл
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-vue-apollo'
```

## Доступные команды

```bash
# Генерация кода один раз
bun run codegen

# Генерация с отслеживанием изменений
bun run codegen:watch
```

## Использование в компонентах

### Query

```vue
<script setup lang="ts">
import { useGetCommentsQuery } from '@/graphql/generated'

const { result, loading, error } = useGetCommentsQuery()
const comments = computed(() => result.value?.comments ?? [])
</script>
```

### Mutation

```vue
<script setup lang="ts">
import { useAddCommentMutation } from '@/graphql/generated'

const { mutate, loading, error } = useAddCommentMutation()

const addComment = async () => {
  await mutate({
    postId: 1,
    comment: 'Новый комментарий',
  })
}
</script>
```

### Subscription

```vue
<script setup lang="ts">
import { useCommentAddedSubscription } from '@/graphql/generated'

const { result } = useCommentAddedSubscription()
const newComment = computed(() => result.value?.commentAdded)
</script>
```

## Структура файлов

```
src/
├── graphql/
│   ├── operations.graphql     # GraphQL операции
│   └── generated.ts           # Сгенерированные типы и composables
└── components/
    └── GraphQLExample.vue     # Пример использования
```

## Workflow

1. Напишите GraphQL операции в файлах `.graphql` или `.gql`
2. Запустите `bun run codegen` для генерации типов
3. Используйте сгенерированные composables в Vue компонентах
4. При изменении схемы API перезапустите codegen

## Типизация

Все операции автоматически типизированы:

- Переменные запросов имеют строгую типизацию
- Результаты запросов типизированы согласно схеме
- Ошибки компиляции при несоответствии типов
- IntelliSense и автодополнение в IDE

## Пример

Смотрите `src/components/GraphQLExample.vue` для полного примера использования всех типов операций.

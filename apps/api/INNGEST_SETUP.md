# Настройка Inngest с NestJS и Fastify

## Установка завершена ✅

Интеграция Inngest настроена для работы с NestJS и Fastify без использования `nest-inngest`.

## Что было сделано:

1. **Создан InngestService** (`src/inngest/inngest.service.ts`)

   - Основная служба для отправки событий
   - Метод `send()` для отправки событий в Inngest

2. **Создан InngestController** (`src/inngest/inngest.controller.ts`)

   - Endpoint `/api/inngest` для webhook'ов Inngest
   - Интеграция с Fastify через `inngest/fastify`

3. **Создан клиент Inngest** (`src/inngest/client.ts`)

   - Экспортированный клиент для использования в функциях

4. **Пример функции** (`src/inngest/functions/sample.function.ts`)

   - Обрабатывает события `user/created`
   - Демонстрирует использование steps

5. **Интеграция с GraphQL**
   - Добавлена мутация `createUser` в AppResolver
   - Показывает, как отправлять события из GraphQL

## Переменные окружения:

Добавьте в ваш `.env` файл:

```env
INNGEST_APP_ID=psre-api
INNGEST_EVENT_KEY=your-event-key-here
INNGEST_SIGNING_KEY=your-signing-key-here
PORT=5000
```

## Как использовать:

### 1. Отправка событий:

```typescript
// В любом сервисе или resolver'е
constructor(private readonly inngestService: InngestService) {}

async someMethod() {
  await this.inngestService.send('user/created', {
    userId: '123',
    email: 'user@example.com'
  });
}
```

### 2. Создание новых функций:

```typescript
// src/inngest/functions/my-function.ts
import { inngest } from '../client';

export const myFunction = inngest.createFunction(
  { id: 'my-function' },
  { event: 'my/event' },
  async ({ event, step }) => {
    await step.run('my-step', async () => {
      // Ваша логика здесь
    });
  },
);
```

### 3. Регистрация функций:

Добавьте новые функции в `InngestController`:

```typescript
functions: [
  sampleFunction,
  myFunction, // Ваша новая функция
],
```

## Тестирование:

1. Запустите сервер: `bun run dev`
2. Перейдите на `http://localhost:5000/graphql`
3. Выполните мутацию:

```graphql
mutation {
  createUser(email: "test@example.com", userId: "123")
}
```

4. Проверьте логи - должно появиться сообщение об отправке события

## Подключение к Inngest Dashboard:

1. Зарегистрируйтесь на [inngest.com](https://inngest.com)
2. Создайте новое приложение
3. Получите ключи API
4. Обновите переменные окружения
5. В dashboard'е добавьте webhook URL: `https://your-domain.com/api/inngest`

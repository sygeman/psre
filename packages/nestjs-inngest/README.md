# @psre/nestjs-inngest

NestJS интеграция для Inngest с поддержкой декораторов и Fastify.

## Особенности

✅ **Декораторы в стиле NestJS** - `@InngestFunction` и `@InngestTrigger`  
✅ **Автоматическое обнаружение функций** через рефлекшн  
✅ **Поддержка Fastify** (в отличие от оригинального nest-inngest)  
✅ **Типобезопасность TypeScript**  
✅ **Dependency Injection** - полная интеграция с DI системой NestJS

## Установка

```bash
bun add @psre/nestjs-inngest inngest fastify
```

## Быстрый старт

### 1. Импортируйте модуль

```typescript
// app.module.ts
import { Module } from '@nestjs/common'
import { InngestModule } from '@psre/nestjs-inngest'

@Module({
  imports: [
    InngestModule, // Добавьте модуль
  ],
})
export class AppModule {}
```

### 2. Создайте функции с декораторами

```typescript
// orders.controller.ts
import { Controller, Injectable } from '@nestjs/common'
import { InngestFunction, InngestTrigger, InngestContext } from '@psre/nestjs-inngest'

@Injectable()
@Controller('orders')
export class OrdersController {
  @InngestFunction({ id: 'orders-handler' })
  @InngestTrigger({ event: 'orders/order.created' })
  async handleOrderCreated(context: InngestContext<{ id: string; product: string }>) {
    const { event, step } = context

    await step.run('process-order', () => {
      console.log('Обработка заказа:', event.data)
      return { processed: true }
    })

    return { success: true }
  }
}
```

### 3. Отправляйте события

```typescript
// любой сервис или resolver
import { InngestService } from '@psre/nestjs-inngest'

@Injectable()
export class SomeService {
  constructor(private readonly inngestService: InngestService) {}

  async createOrder(orderData: any) {
    // Ваша бизнес-логика...

    // Отправка события
    await this.inngestService.send('orders/order.created', {
      id: orderData.id,
      product: orderData.product,
    })
  }
}
```

## API Reference

### Декораторы

#### `@InngestFunction(config)`

Помечает метод как Inngest функцию.

```typescript
@InngestFunction({
  id: 'my-function',           // Обязательно: уникальный ID
  name: 'My Function',         // Опционально: отображаемое имя
  concurrency: 10,             // Опционально: лимит конкурентности
  retries: 3                   // Опционально: количество повторов
})
```

#### `@InngestTrigger(config)`

Определяет триггер для функции.

```typescript
@InngestTrigger({
  event: 'my/event',           // Обязательно: название события
  if: 'event.data.status === "active"',  // Опционально: условие
  cron: '0 9 * * *'            // Опционально: cron расписание
})
```

### Сервисы

#### `InngestService`

Основной сервис для взаимодействия с Inngest.

```typescript
class InngestService {
  // Отправить событие
  async send(event: string, data: Record<string, unknown>): Promise<void>

  // Получить клиент Inngest
  readonly inngest: Inngest
}
```

### Типы

#### `InngestContext<T>`

Контекст выполнения функции с типизированными данными события.

```typescript
type InngestContext<T = Record<string, unknown>> = {
  event: {
    id: string
    name: string
    data: T // Типизированные данные
    timestamp: number
  }
  step: {
    run<K>(id: string, handler: () => Promise<K> | K): Promise<K>
    sendEvent(id: string, events: any[]): Promise<void>
    sleep(id: string, duration: string): Promise<void>
    // ... другие step методы
  }
}
```

## Переменные окружения

```env
INNGEST_APP_ID=my-app           # ID приложения в Inngest
INNGEST_EVENT_KEY=evt_...       # Ключ для отправки событий
INNGEST_SIGNING_KEY=signkey_... # Ключ для подписи webhook'ов
```

## Требования

- **NestJS** ^11.0.0
- **Inngest** ^3.38.0
- **Fastify** ^4.0.0
- **TypeScript** ^5.0.0

## Пример проекта

Полный пример использования смотрите в [`apps/api`](../../apps/api).

## Лицензия

MIT

# PSRE

Проект с использованием SolidJS, Elysia сервера и Inngest для фоновых задач.

## Технологии

- **Frontend**: SolidJS + Vite + TailwindCSS
- **Backend**: Elysia (TypeScript веб-фреймворк)
- **Фоновые задачи**: Inngest
- **Среда выполнения**: Bun
- **Стили**: TailwindCSS

## Установка

```bash
# Установка зависимостей
bun install
```

## Запуск

### Локальная разработка

1. **Запуск фронтенда**:

```bash
bun run dev
```

Откроется на `http://localhost:5173`

2. **Запуск сервера**:

```bash
bun run server:watch
```

Сервер запустится на `http://localhost:3333`

3. **Запуск Inngest worker**:

```bash
bun run worker:watch
```

Worker запустится на `http://localhost:3000`

### Docker (Inngest Dev Server)

Для использования локального dev-сервера Inngest:

```bash
docker-compose up
```

**Inngest Dashboard** будет доступен на `http://localhost:8288`

## Inngest

Inngest используется для управления фоновыми задачами и event-driven архитектуры.

### Доступ к Inngest Dashboard

После запуска `docker-compose up`, Inngest dev server будет доступен на:

- **Dashboard**: `http://localhost:8288`
- **API**: `http://localhost:8289`

### Настроенные функции

1. **hello-world** - обработчик события hello-world
2. **prepare-weekly-digest** - cron-задача, выполняется каждую минуту (для тестирования)

### Как это работает

1. Основной сервер (Elysia) отправляет события в Inngest через `inngest.send()`
2. Worker приложение (`worker.ts`) обрабатывает эти события через зарегистрированные функции
3. Inngest dev server в Docker предоставляет UI для мониторинга и отладки

## Структура проекта

```
├── src/                    # Frontend код (SolidJS)
├── server.ts              # Основной Elysia сервер
├── worker.ts              # Inngest worker с функциями
├── docker-compose.yaml    # Inngest dev server
└── package.json           # Зависимости и скрипты
```

## Полезные команды

```bash
# Форматирование кода
bun run format

# Линтинг
bun run lint

# Сборка фронтенда
bun run build

# Превью продакшн сборки
bun run serve
```

## Окружение

Проект использует:

- Node.js альтернативу: **Bun**
- Порты:
  - 5173 - Vite dev server (фронтенд)
  - 3333 - Elysia сервер
  - 3000 - Inngest worker
  - 8288 - Inngest dashboard
  - 8289 - Inngest API

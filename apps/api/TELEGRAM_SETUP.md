# Настройка Telegram бота для авторизации

## 1. Создание бота

1. Найдите в Telegram бота @BotFather
2. Отправьте команду `/newbot`
3. Введите название бота (например: "PSRE Admin Auth Bot")
4. Введите username бота (например: "psre_admin_auth_bot")
5. Скопируйте полученный токен

## 2. Настройка переменных окружения

Создайте файл `.env` в папке `apps/api/` и добавьте:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=your_bot_username_here

# Whitelist авторизованных пользователей (через запятую)
AUTHORIZED_TELEGRAM_USERS=123456789,admin_username,@another_user
```

## 3. Настройка безопасности

### 3.1. Получение Telegram ID

Чтобы узнать свой Telegram ID:

1. Напишите боту @userinfobot команду `/start`
2. Скопируйте ваш ID (например: 123456789)

### 3.2. Whitelist пользователей

В переменной `AUTHORIZED_TELEGRAM_USERS` укажите через запятую:

- **Telegram ID** (числовой): `123456789`
- **Username** (без @): `admin_username`
- **Username** (с @): `@admin_username`

### 3.3. Примеры настройки

```env
# Только один пользователь по ID
AUTHORIZED_TELEGRAM_USERS=123456789

# Несколько пользователей (ID и username)
AUTHORIZED_TELEGRAM_USERS=123456789,admin_user,@moderator

# Смешанный формат
AUTHORIZED_TELEGRAM_USERS=123456789,@admin,another_user,987654321
```

⚠️ **ВАЖНО**: Если `AUTHORIZED_TELEGRAM_USERS` не настроено, доступ будет разрешен всем пользователям!

## 4. Пример конфигурации

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_BOT_USERNAME=psre_admin_auth_bot
AUTHORIZED_TELEGRAM_USERS=123456789,admin_user,@moderator
```

## 5. Запуск

```bash
cd apps/api
bun run dev
```

## 6. Процесс авторизации

1. **Пользователь нажимает "Открыть бота"** в админ-панели
2. **Открывается Telegram бот** (@your_bot_username)
3. **Пользователь отправляет команду /start** боту
4. **Бот проверяет whitelist** пользователя
5. **При успехе выдает 6-значный код** авторизации
6. **Пользователь вводит код** в админ-панель
7. **Система проверяет код и авторизует** пользователя

## 7. Команды бота

- `/start` - получить код авторизации
- `/auth` - получить новый код авторизации

## 8. Диагностика

Проверить статус бота можно через API:

```
GET http://localhost:4000/api/auth/telegram/info
```

Ответ будет содержать информацию о whitelist:

```json
{
  "success": true,
  "authorizedUsersCount": 3,
  "authorizedUsers": ["123456789", "admin_user", "@moderator"],
  "securityWarning": null
}
```

## 9. Безопасность

- Коды действительны 5 минут
- Токены действительны 24 часа
- Использованные коды автоматически удаляются
- Истёкшие токены автоматически очищаются
- **Только whitelist пользователи могут получить токены**
- Неавторизованные пользователи получают сообщение с их ID для настройки

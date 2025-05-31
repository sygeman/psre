import { Bot } from 'grammy';
import process from 'node:process';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'YourBotUsername';

// Whitelist авторизованных пользователей (Telegram ID или username)
const AUTHORIZED_USERS = process.env.AUTHORIZED_TELEGRAM_USERS?.split(',').map(u => u.trim()) || [];

// Временное хранилище токенов авторизации (в продакшене использовать Redis или базу данных)
export const authTokens = new Map<string, { telegramId: number; username: string; timestamp: number }>();
export const authCodes = new Map<string, { code: string; timestamp: number }>();

// Инициализация Grammy бота
let bot: Bot | null = null;

function generateAuthToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateAuthCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-значный код
}

function isUserAuthorized(telegramId: number, username?: string): boolean {
  // Если whitelist пуст, разрешаем всем (для разработки)
  if (AUTHORIZED_USERS.length === 0) {
    console.warn('⚠️ AUTHORIZED_TELEGRAM_USERS не настроен - разрешен доступ всем пользователям!');
    return true;
  }

  // Проверяем по ID и username
  const userIdString = telegramId.toString();
  const userUsername = username?.toLowerCase();

  return AUTHORIZED_USERS.some(authorized => {
    const auth = authorized.toLowerCase();
    return auth === userIdString || 
           auth === userUsername ||
           auth === `@${userUsername}`;
  });
}

export function initializeTelegramBot(): Bot | null {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('Telegram bot is not configured (missing TELEGRAM_BOT_TOKEN)');
    return null;
  }

  bot = new Bot(TELEGRAM_BOT_TOKEN);
  
  // Обработка команды /start
  bot.command('start', async (ctx) => {
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;

    // Проверяем авторизацию пользователя
    if (!isUserAuthorized(chatId, ctx.from?.username)) {
      await ctx.reply(
        '🚫 Доступ запрещен.\n\n' +
        '❌ Вы не авторизованы для использования этого бота.\n\n' +
        '📞 Обратитесь к администратору системы для получения доступа.\n\n' +
        `👤 Ваш ID: ${chatId}\n` +
        `📝 Username: ${ctx.from?.username || 'не указан'}`
      );
      return;
    }

    // Генерируем код авторизации для пользователя
    const authCode = generateAuthCode();
    authCodes.set(authCode, {
      code: authCode,
      timestamp: Date.now()
    });

    await ctx.reply(
      '🔐 Ваш код для входа в админ-панель PSRE:\n\n' +
      `\`${authCode}\`\n\n` +
      '📋 Скопируйте этот код и введите в админ-панели.\n\n' +
      '⏰ Код действителен 5 минут.\n\n' +
      '🔄 Для получения нового кода отправьте /auth',
      { parse_mode: 'Markdown' }
    );
  });
  
  // Команда для получения нового кода
  bot.command('auth', async (ctx) => {
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;

    // Проверяем авторизацию пользователя
    if (!isUserAuthorized(chatId, ctx.from?.username)) {
      await ctx.reply(
        '🚫 Доступ запрещен.\n\n' +
        '❌ Вы не авторизованы для использования этого бота.\n\n' +
        '📞 Обратитесь к администратору системы для получения доступа.\n\n' +
        `👤 Ваш ID: ${chatId}\n` +
        `📝 Username: ${ctx.from?.username || 'не указан'}`
      );
      return;
    }

    // Генерируем новый код авторизации
    const authCode = generateAuthCode();
    authCodes.set(authCode, {
      code: authCode,
      timestamp: Date.now()
    });

    await ctx.reply(
      '🔐 Новый код для входа в админ-панель:\n\n' +
      `\`${authCode}\`\n\n` +
      '📋 Скопируйте этот код и введите в админ-панели.\n\n' +
      '⏰ Код действителен 5 минут.',
      { parse_mode: 'Markdown' }
    );
  });
  
  // Обработка текстовых сообщений
  bot.on('message:text', async (ctx) => {
    const messageText = ctx.message.text.trim();
    const chatId = ctx.chat.id;
    
    // Пропускаем команды
    if (messageText.startsWith('/')) {
      return;
    }

    // Проверяем авторизацию пользователя
    if (!isUserAuthorized(chatId, ctx.from?.username)) {
      await ctx.reply(
        '🚫 Доступ запрещен.\n\n' +
        '❌ Вы не авторизованы для использования этого бота.\n\n' +
        '📞 Обратитесь к администратору системы для получения доступа.\n\n' +
        `👤 Ваш ID: ${chatId}\n` +
        `📝 Username: ${ctx.from?.username || 'не указан'}`
      );
      return;
    }
    
    // Подсказка пользователю
    await ctx.reply(
      '💡 Используйте команды:\n\n' +
      '🔐 /start - получить код авторизации\n' +
      '🔄 /auth - получить новый код\n\n' +
      '📋 Скопируйте полученный код и введите в админ-панели.'
    );
  });
  
  // Обработка ошибок
  bot.catch((err) => {
    console.error('Ошибка Telegram бота:', err);
  });
  
  // Запуск бота
  bot.start({
    onStart: (botInfo) => {
      console.log(`Telegram бот запущен: @${botInfo.username}`);
    }
  });

  return bot;
}

export function verifyAuthCode(code: string): { success: boolean; user?: any; error?: string } {
  if (!code) {
    return { 
      success: false, 
      error: 'Код не предоставлен' 
    };
  }
  
  const codeData = authCodes.get(code);
  if (!codeData) {
    return { 
      success: false, 
      error: 'Неверный код авторизации' 
    };
  }
  
  // Проверяем что код не истёк (5 минут)
  if (Date.now() - codeData.timestamp > 5 * 60 * 1000) {
    authCodes.delete(code);
    return { 
      success: false, 
      error: 'Код авторизации истёк' 
    };
  }
  
  // Удаляем использованный код
  authCodes.delete(code);
  
  // Создаем сессию для пользователя
  const authToken = generateAuthToken();
  
  return {
    success: true,
    user: {
      telegramId: Date.now(), // Временный ID пока не знаем реального
      username: 'authorized_user',
      authToken
    }
  };
}

export function getBotInfo(): any {
  return {
    success: true,
    botConfigured: !!TELEGRAM_BOT_TOKEN,
    botUsername: TELEGRAM_BOT_USERNAME,
    pendingCodesCount: authCodes.size,
    activeTokensCount: authTokens.size,
    authorizedUsersCount: AUTHORIZED_USERS.length,
    authorizedUsers: AUTHORIZED_USERS.length > 0 ? AUTHORIZED_USERS : 'Не настроено (доступ всем)',
    securityWarning: AUTHORIZED_USERS.length === 0 ? 'ВНИМАНИЕ: whitelist пользователей не настроен!' : null
  };
}

export function isBotConfigured(): boolean {
  return !!TELEGRAM_BOT_TOKEN;
} 
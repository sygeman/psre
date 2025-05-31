import { Bot } from 'grammy';
import process from 'node:process';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'YourBotUsername';

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

export function initializeTelegramBot(): Bot | null {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('Telegram bot is not configured (missing TELEGRAM_BOT_TOKEN)');
    return null;
  }

  bot = new Bot(TELEGRAM_BOT_TOKEN);
  
  // Обработка команды /start
  bot.command('start', async (ctx) => {
    await ctx.reply(
      '👋 Добро пожаловать в бота авторизации PSRE!\n\n' +
      '🔐 Для авторизации в админ-панели:\n' +
      '1. Запросите код авторизации в админ-панели\n' +
      '2. Отправьте полученный код сюда\n' +
      '3. Получите токен для входа\n\n' +
      '💡 Просто отправьте мне ваш код авторизации.'
    );
  });
  
  // Обработка текстовых сообщений (кодов авторизации)
  bot.on('message:text', async (ctx) => {
    const messageText = ctx.message.text.trim();
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;
    
    // Пропускаем команды
    if (messageText.startsWith('/')) {
      return;
    }
    
    // Проверяем, является ли сообщение кодом авторизации
    if (authCodes.has(messageText)) {
      const codeData = authCodes.get(messageText)!;
      
      // Проверяем что код не истёк (5 минут)
      if (Date.now() - codeData.timestamp < 5 * 60 * 1000) {
        // Генерируем авторизационный токен
        const authToken = generateAuthToken();
        authTokens.set(authToken, {
          telegramId: chatId,
          username,
          timestamp: Date.now()
        });
        
        authCodes.delete(messageText);
        
        await ctx.reply(
          `✅ Авторизация успешна!\n\n` +
          `Ваш токен авторизации:\n` +
          `\`${authToken}\`\n\n` +
          `Скопируйте этот токен и вставьте в админ-панель.\n\n` +
          `⚠️ Токен действителен 24 часа.`,
          { parse_mode: 'Markdown' }
        );
      } else {
        authCodes.delete(messageText);
        await ctx.reply('❌ Код авторизации истёк. Запросите новый в админ-панели.');
      }
    } else {
      await ctx.reply(
        '❓ Неверный код авторизации.\n\n' +
        '🔄 Проверьте правильность кода или запросите новый в админ-панели.\n\n' +
        '💡 Код должен состоять из 6 цифр.'
      );
    }
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

export function createAuthCode(): { authCode: string; botUsername: string; expiresIn: number } {
  const authCode = generateAuthCode();
  authCodes.set(authCode, {
    code: authCode,
    timestamp: Date.now()
  });
  
  return {
    authCode,
    botUsername: TELEGRAM_BOT_USERNAME,
    expiresIn: 5 * 60 * 1000 // 5 минут
  };
}

export function verifyAuthToken(token: string): { success: boolean; user?: any; error?: string } {
  if (!token) {
    return { 
      success: false, 
      error: 'Токен не предоставлен' 
    };
  }
  
  const authData = authTokens.get(token);
  if (!authData) {
    return { 
      success: false, 
      error: 'Неверный токен' 
    };
  }
  
  // Проверяем что токен не истёк (24 часа)
  if (Date.now() - authData.timestamp > 24 * 60 * 60 * 1000) {
    authTokens.delete(token);
    return { 
      success: false, 
      error: 'Токен истёк' 
    };
  }
  
  return {
    success: true,
    user: {
      telegramId: authData.telegramId,
      username: authData.username
    }
  };
}

export function getBotInfo(): any {
  return {
    success: true,
    botConfigured: !!TELEGRAM_BOT_TOKEN,
    botUsername: TELEGRAM_BOT_USERNAME,
    pendingCodesCount: authCodes.size,
    activeTokensCount: authTokens.size
  };
}

export function isBotConfigured(): boolean {
  return !!TELEGRAM_BOT_TOKEN;
} 
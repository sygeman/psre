import { Bot } from 'grammy';
import process from 'node:process';
import { generateAuthToken } from './auth/generate-auth-token';

// Инициализация Grammy бота
let bot: Bot | null = null;

const authCodeReply = (code: string) => '🔐 Ваш код для входа:\n\n' +
      `\`${code}\`\n\n` +
      '📋 Скопируйте этот код и введите в форме входа.\n\n' +
      '⏰ Код действителен 5 минут.\n\n' +
      '🔄 Для получения нового кода отправьте /auth'

export function initializeTelegramBot(): Bot | null {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

  if (!TELEGRAM_BOT_TOKEN) {
    console.log('Telegram bot is not configured (missing TELEGRAM_BOT_TOKEN)');
    return null;
  }

  bot = new Bot(TELEGRAM_BOT_TOKEN);
  
  // Обработка команды /start
  bot.command('start', async (ctx) => {
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;

    const authCode = await generateAuthToken(chatId, username);
    await ctx.reply(authCodeReply(authCode), { parse_mode: 'Markdown' });
  });
  
  // Команда для получения нового кода
  bot.command('auth', async (ctx) => {
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;

    const authCode = await generateAuthToken(chatId, username);
    await ctx.reply(authCodeReply(authCode), { parse_mode: 'Markdown' });
  });
  
  // Обработка текстовых сообщений
  bot.on('message:text', async (ctx) => {
    const messageText = ctx.message.text.trim();
    
    // Пропускаем команды
    if (messageText.startsWith('/')) return;
    
    await ctx.reply(
      '💡 Используйте команды:\n\n' +
      '🔐 /start - получить код авторизации\n' +
      '🔄 /auth - получить новый код\n\n' +
      '📋 Скопируйте полученный код и введите в админ-панели.'
    );
  });
  
  bot.catch((err) => console.error('Ошибка Telegram бота:', err));
  bot.start({onStart: (botInfo) => console.log(`Telegram бот запущен: @${botInfo.username}`)});

  return bot;
}
import { Elysia } from 'elysia'
import { inngestHandler, inngest } from './inngest';
import { Bot } from 'grammy';
import process from 'node:process';

const PORT = Number(process.env.PORT) || 4000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'YourBotUsername';

// Временное хранилище токенов авторизации (в продакшене использовать Redis или базу данных)
const authTokens = new Map<string, { telegramId: number; username: string; timestamp: number }>();
const pendingAuth = new Map<string, { token: string; timestamp: number }>();

// Инициализация Grammy бота
let bot: Bot | null = null;
if (TELEGRAM_BOT_TOKEN) {
  bot = new Bot(TELEGRAM_BOT_TOKEN);
  
  // Обработка команды /start с токеном
  bot.command('start', async (ctx) => {
    const token = ctx.match;
    const chatId = ctx.chat.id;
    const username = ctx.from?.username || `user_${chatId}`;
    
    if (token && pendingAuth.has(token)) {
      const authData = pendingAuth.get(token)!;
      
      // Проверяем что токен не истёк (5 минут)
      if (Date.now() - authData.timestamp < 5 * 60 * 1000) {
        // Генерируем авторизационный токен
        const authToken = generateAuthToken();
        authTokens.set(authToken, {
          telegramId: chatId,
          username,
          timestamp: Date.now()
        });
        
        pendingAuth.delete(token);
        
        await ctx.reply(
          `✅ *Авторизация успешна!*\n\n` +
          `Ваш токен авторизации:\n` +
          `\`${authToken}\`\n\n` +
          `Скопируйте этот токен и вставьте в админ-панель\\.\n\n` +
          `⚠️ Токен действителен 24 часа\\.`,
          { parse_mode: 'MarkdownV2' }
        );
      } else {
        pendingAuth.delete(token);
        await ctx.reply('❌ Токен авторизации истёк. Запросите новый в админ-панели.');
      }
    } else if (token) {
      await ctx.reply('❌ Неверный или истёкший токен авторизации.');
    } else {
      await ctx.reply(
        '👋 Добро пожаловать в бота для авторизации в админ-панели PSRE!\n\n' +
        'Для авторизации используйте ссылку из админ-панели.'
      );
    }
  });
  
  // Обработка всех остальных сообщений
  bot.on('message', async (ctx) => {
    if (!ctx.message.text?.startsWith('/start')) {
      await ctx.reply(
        'Для авторизации используйте ссылку из админ-панели PSRE.\n\n' +
        'Если у вас есть ссылка авторизации, просто перейдите по ней.'
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
}

function generateAuthToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateTempToken(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

new Elysia()
    .get('/', async () => {
        await inngest.send({
            name: "hello-world",
            data: {
                message: "Hello Elysia"
            }
        })
        
        return {
            message: "Hello Elysia"
        }
    })
    // API для получения ссылки авторизации через Telegram
    .post('/api/auth/telegram/request', () => {
        if (!TELEGRAM_BOT_TOKEN) {
            return { 
                success: false, 
                error: 'Telegram бот не настроен' 
            };
        }
        
        const tempToken = generateTempToken();
        pendingAuth.set(tempToken, {
            token: tempToken,
            timestamp: Date.now()
        });
        
        // Создаём глубокую ссылку для Telegram
        const telegramUrl = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${tempToken}`;
        
        return {
            success: true,
            telegramUrl,
            tempToken,
            expiresIn: 5 * 60 * 1000 // 5 минут
        };
    })
    // API для проверки авторизации по токену
    .post('/api/auth/telegram/verify', async ({ body }: { body: any }) => {
        const { token } = body as { token: string };
        
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
    })
    // API для получения информации о боте (для диагностики)
    .get('/api/auth/telegram/info', () => {
        if (!bot) {
            return {
                success: false,
                error: 'Telegram бот не настроен'
            };
        }
        
        return {
            success: true,
            botConfigured: !!TELEGRAM_BOT_TOKEN,
            botUsername: TELEGRAM_BOT_USERNAME,
            pendingAuthCount: pendingAuth.size,
            activeTokensCount: authTokens.size
        };
    })
    .ws('/ws', {
        message(ws, message) {
            console.log('Received message:', message);
            
            // Отправляем echo сообщение обратно
            ws.send({
                type: 'echo',
                data: message,
                timestamp: new Date().toISOString()
            });
        },
        open(ws) {
            console.log('WebSocket connection opened');
            ws.send({
                type: 'welcome',
                message: 'Connected to WebSocket server',
                timestamp: new Date().toISOString()
            });
        },
        close(ws) {
            console.log('WebSocket connection closed');
        }
    })
    .all('/api/inngest', inngestHandler) 
    .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`WebSocket available at: ws://localhost:${PORT}/ws`);
        if (bot) {
            console.log('Telegram bot configured and running');
        } else {
            console.log('Telegram bot is not configured (missing TELEGRAM_BOT_TOKEN)');
        }
    })

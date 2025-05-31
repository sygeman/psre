import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { inngestHandler } from './inngest';
import { 
  initializeTelegramBot, 
  verifyAuthCode, 
  verifyAuthToken,
  isBotConfigured
} from './lib/telegram-bot';
import process from 'node:process';

const PORT = Number(process.env.PORT) || 4000;

// Инициализация Telegram бота
const bot = initializeTelegramBot();

// Счетчик активных WebSocket соединений
let activeConnections = 0;
// Карта активных соединений по пользователям (telegramId -> WebSocket)
const activeUserConnections = new Map<number, any>();

new Elysia()
    .use(cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    }))
    // API для получения кода авторизации
    .post('/api/auth/telegram/request', () => {
        if (!isBotConfigured()) {
            return { 
                success: false, 
                error: 'Telegram бот не настроен' 
            };
        }
        
        return {
            success: true,
            message: 'Откройте Telegram бота и отправьте команду /start для получения кода авторизации',
            botUsername: process.env.TELEGRAM_BOT_USERNAME || 'sgmn_dev_bot'
        };
    })
    // API для проверки авторизации по токену
    .post('/api/auth/telegram/verify', async ({ body: { code } }: { body: { code: string } }) => {
        return verifyAuthCode(code);
    })
    // API для проверки валидности токена
    .post('/api/auth/telegram/check', async ({ body: { token, userId } }: { body: { token: string; userId?: number } }) => {
        return verifyAuthToken(token, userId);
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
            activeConnections++;
            console.log(`📡 WebSocket connection opened (Active connections: ${activeConnections})`);
            
            const url = new URL(ws.data?.request?.url || '');
            let token = url.searchParams.get('token');
            let userId = url.searchParams.get('userId');

            if (!token) {
                console.log('❌ No token provided');
                ws.send({
                    type: 'error',
                    message: 'Токен авторизации не предоставлен',
                    timestamp: new Date().toISOString()
                });
                ws.close(1008, 'Токен авторизации не предоставлен');
                activeConnections--; // Уменьшаем счетчик при неудачном подключении
                console.log(`📊 Active connections: ${activeConnections}`);
                return;
            }
            
            // Проверяем валидность токена с userId
            const userIdNumber = userId ? parseInt(userId, 10) : undefined;
            const authResult = verifyAuthToken(token, userIdNumber);
            console.log('Token verification result:', authResult);
            console.log('Provided userId:', userIdNumber);
            
            if (!authResult.success) {
                console.log('❌ Token verification failed:', authResult.error);
                ws.send({
                    type: 'error',
                    message: authResult.error || 'Неверный токен авторизации',
                    timestamp: new Date().toISOString()
                });
                ws.close(1008, authResult.error || 'Неверный токен авторизации');
                activeConnections--; // Уменьшаем счетчик при неудачном подключении
                console.log(`📊 Active connections: ${activeConnections}`);
                return;
            }
            
            console.log('✅ Token verified for user:', authResult.user?.username);
            console.log('✅ User ID verified:', authResult.user?.telegramId);
            
            const telegramId = authResult.user?.telegramId;
            
            // Проверяем, есть ли уже активное соединение от этого пользователя
            if (activeUserConnections.has(telegramId)) {
                const existingWs = activeUserConnections.get(telegramId);
                if (existingWs && existingWs.readyState === WebSocket.OPEN) {
                    console.log(`🔄 Closing previous connection for user ${authResult.user?.username} (ID: ${telegramId})`);
                    existingWs.close(1000, 'Новое соединение от того же пользователя');
                }
            }
            
            // Сохраняем информацию о пользователе в контексте WebSocket
            (ws as any).user = authResult.user;
            
            // Регистрируем новое соединение пользователя
            activeUserConnections.set(telegramId, ws);
            
            console.log(`🔗 WebSocket connection established for user: ${authResult.user?.username} (ID: ${authResult.user?.telegramId})`);
            console.log(`👥 Unique users connected: ${activeUserConnections.size}`);
            ws.send({
                type: 'welcome',
                message: `Добро пожаловать, ${authResult.user?.username}!`,
                user: authResult.user,
                timestamp: new Date().toISOString()
            });
        },
        close(ws) {
            activeConnections--;
            const user = (ws as any).user;
            const telegramId = user?.telegramId;
            
            // Удаляем соединение пользователя из карты, если это именно это соединение
            if (telegramId && activeUserConnections.get(telegramId) === ws) {
                activeUserConnections.delete(telegramId);
                console.log(`🗑️ Removed user ${user?.username} (ID: ${telegramId}) from active connections`);
            }
            
            console.log(`🔌 WebSocket connection closed for user: ${user?.username || 'unknown'} (ID: ${user?.telegramId || 'unknown'})`);
            console.log(`📊 Active connections: ${activeConnections}, Unique users: ${activeUserConnections.size}`);
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

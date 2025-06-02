import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { inngestHandler } from './inngest';
import { initializeTelegramBot } from './lib/telegram-bot';
import process from 'node:process';
import { checkAuthToken } from './lib/auth/check-auth-token';
import { verifyAuthCode } from './lib/auth/verify-auth-code';

const PORT = Number(process.env.PORT) || 4000;

// Инициализация Telegram бота
const bot = initializeTelegramBot();

new Elysia()
    .use(cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    }))
    // API для проверки авторизации по токену
    .post('/api/auth/telegram/verify', async ({ body: { code } }: { body: { code: string } }) => {
        return verifyAuthCode(code);
    })
    // API для проверки валидности токена
    .post('/api/auth/telegram/check', async ({ body: { token, userId } }: { body: { token: string; userId: string } }) => {
        return checkAuthToken(token, userId);
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
        async open(ws) {
            const url = new URL(ws.data?.request?.url || '');
            let token = url.searchParams.get('token');
            let userId = url.searchParams.get('userId');

            if (!token || !userId) {
                console.log('❌ No token or userId provided');
                ws.send({
                    type: 'error',
                    message: 'Токен авторизации или ID пользователя не предоставлен',
                    timestamp: new Date().toISOString()
                });
                ws.close(1008, 'Токен авторизации или ID пользователя не предоставлен');
                return;
            }
            
            const authResult = await checkAuthToken(token, userId);
            
            if (!authResult.success) {
                console.log('❌ Token verification failed:', authResult.error);
                ws.send({
                    type: 'error',
                    message: authResult.error || 'Неверный токен авторизации',
                    timestamp: new Date().toISOString()
                });
                ws.close(1008, authResult.error || 'Неверный токен авторизации');
                return;
            }
            
            console.log('✅ User ID verified:', authResult.data?.userId);
                        
            // Сохраняем информацию о пользователе в контексте WebSocket
            (ws as any).user = authResult.data;
            
            // Регистрируем новое соединение пользователя
            
            console.log(`🔗 WebSocket connection established for user: (ID: ${authResult.data?.userId})`);
            ws.send({
                type: 'welcome',
                message: `Добро пожаловать!`,
                user: authResult.data,
                timestamp: new Date().toISOString()
            });
        },
        close(ws) {
            const user = (ws as any).user;
            
            console.log(`🔌 WebSocket connection closed for user: (ID: ${user?.telegramId || 'unknown'})`);
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

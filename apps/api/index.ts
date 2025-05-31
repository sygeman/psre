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
    .post('/api/auth/telegram/check', async ({ body: { token } }: { body: { token: string } }) => {
        return verifyAuthToken(token);
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
            
            const url = new URL(ws.data?.request?.url || '');
            let token = url.searchParams.get('token');

            if (!token) {
                console.log('❌ No token provided');
                ws.send({
                    type: 'error',
                    message: 'Токен авторизации не предоставлен',
                    timestamp: new Date().toISOString()
                });
                ws.close(1008, 'Токен авторизации не предоставлен');
                return;
            }
            
            // Проверяем валидность токена
            const authResult = verifyAuthToken(token);
            console.log('Token verification result:', authResult);
            
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
            
            console.log('✅ Token verified for user:', authResult.user?.username);
            
            // Сохраняем информацию о пользователе в контексте WebSocket
            (ws as any).user = authResult.user;
            
            console.log(`WebSocket connection opened for user: ${authResult.user?.username}`);
            ws.send({
                type: 'welcome',
                message: `Добро пожаловать, ${authResult.user?.username}!`,
                user: authResult.user,
                timestamp: new Date().toISOString()
            });
        },
        close(ws) {
            const user = (ws as any).user;
            console.log(`WebSocket connection closed for user: ${user?.username || 'unknown'}`);
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

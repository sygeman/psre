import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { inngestHandler, inngest } from './inngest';
import { 
  initializeTelegramBot, 
  generateAuthCode, 
  verifyAuthCode, 
  getBotInfo, 
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
    // API для получения кода авторизации
    .post('/api/auth/telegram/request', () => {
        if (!isBotConfigured()) {
            return { 
                success: false, 
                error: 'Telegram бот не настроен' 
            };
        }
        
        const code = generateAuthCode();
        
        return {
            success: true,
            code
        };
    })
    // API для проверки авторизации по токену
    .post('/api/auth/telegram/verify', async ({ body }: { body: any }) => {
        const { code } = body as { code: string };
        return verifyAuthCode(code);
    })
    // API для получения информации о боте (для диагностики)
    .get('/api/auth/telegram/info', () => {
        if (!bot) {
            return {
                success: false,
                error: 'Telegram бот не настроен'
            };
        }
        
        return getBotInfo();
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

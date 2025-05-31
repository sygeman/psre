import express, { Request, Response } from 'express';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http';
import process from 'node:process';
import { initializeTelegramBot, verifyAuthCode, getBotInfo, isBotConfigured } from '../lib/telegram-bot.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Инициализация Telegram бота
const bot = initializeTelegramBot();

// API для проверки кода авторизации
app.post('/api/auth/telegram/verify', (req: Request, res: Response) => {
  const { code } = req.body;
  
  if (!isBotConfigured()) {
    return res.json({
      success: false,
      error: 'Telegram бот не настроен'
    });
  }
  
  const result = verifyAuthCode(code);
  res.json(result);
});

// Диагностическая информация о боте
app.get('/api/auth/telegram/info', (req: Request, res: Response) => {
  const info = getBotInfo();
  res.json(info);
});

// WebSocket соединения для sandbox
wss.on('connection', (ws) => {
  console.log('WebSocket клиент подключен');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Получено сообщение:', data);
      
      // Эхо ответ
      ws.send(JSON.stringify({
        type: 'echo',
        data: data,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Ошибка обработки сообщения:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket клиент отключен');
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 
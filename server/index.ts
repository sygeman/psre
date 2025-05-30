import { Elysia } from 'elysia'
import { inngestHandler, inngest } from './inngest';
import process from 'node:process';

const PORT = Number(process.env.PORT) || 4000;

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
    })

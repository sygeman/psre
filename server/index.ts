import { Elysia } from 'elysia'
import { inngestHandler, inngest } from './inngest';

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
    .all('/api/inngest', inngestHandler) 
    .listen(4000, () => console.log("Server is running on http://localhost:4000"))

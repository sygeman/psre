import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { serve } from 'inngest/express';
import { inngest } from './lib/inngest';
import { pubSub } from './lib/pubsub';

// Функция для обработки сообщений чата
const handleMessageCreated = inngest.createFunction(
  { id: 'chat-message-handler' },
  { event: 'chat/message.created' },
  async ({ event }) => {
    await pubSub.publish('createdChatMessage', {
      createdChatMessage: {
        id: event.data.id,
        chatId: event.data.chatId,
        content: event.data.content,
        userId: event.data.userId,
        userName: event.data.userName,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { success: true };
  },
);

@Controller('api/inngest')
export class InngestController {
  @All()
  async handleInngest(@Req() req: Request, @Res() res: Response) {
    return serve({
      client: inngest,
      functions: [handleMessageCreated],
    })(req, res);
  }
}

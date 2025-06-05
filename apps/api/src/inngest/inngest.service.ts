import { Injectable, Logger } from '@nestjs/common';
import { Inngest } from 'inngest';

@Injectable()
export class InngestService {
  private readonly logger = new Logger(InngestService.name);

  public readonly inngest = new Inngest({
    id: process.env.INNGEST_APP_ID || 'psre-api',
  });

  constructor() {
    this.logger.log('Inngest service initialized');
  }

  // Метод для отправки событий
  async send(event: string, data: Record<string, any>) {
    try {
      await this.inngest.send({
        name: event,
        data,
      });
      this.logger.log(`Event sent: ${event}`);
    } catch (error) {
      this.logger.error(`Failed to send event ${event}:`, error);
      throw error;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common'
import { Inngest, type InngestFunction } from 'inngest'

@Injectable()
export class InngestService {
  private readonly logger = new Logger(InngestService.name)
  private functions: InngestFunction.Any[] = []

  public readonly inngest = new Inngest({
    id: process.env.INNGEST_APP_ID || 'psre-api',
  })

  constructor() {
    this.logger.log('Inngest service initialized')
  }

  // Метод для отправки событий
  async send(event: string, data: Record<string, unknown>) {
    try {
      await this.inngest.send({
        name: event,
        data,
      })
      this.logger.log(`Event sent: ${event}`)
    } catch (error) {
      this.logger.error(`Failed to send event ${event}:`, error)
      throw error
    }
  }

  // Метод для добавления функций
  addFunctions(functions: InngestFunction.Any[]) {
    this.functions.push(...functions)
  }

  // Метод для получения всех функций
  getFunctions(): InngestFunction.Any[] {
    return this.functions
  }
}

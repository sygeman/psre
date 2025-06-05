import { Controller, All, Req, Res } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { serve } from 'inngest/fastify'
import { InngestService } from './inngest.service'

@Controller('api/inngest')
export class InngestController {
  constructor(private readonly inngestService: InngestService) {}

  @All()
  async handleInngest(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const handler = serve({
      client: this.inngestService.inngest,
      functions: this.inngestService.getFunctions(),
    })

    return handler(req as Parameters<typeof handler>[0], res as Parameters<typeof handler>[1])
  }
}

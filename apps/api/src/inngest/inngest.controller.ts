import { Controller, All, Req, Res } from '@nestjs/common';
import { serve } from 'inngest/fastify';
import { InngestService } from './inngest.service';
// import { sampleFunction } from './functions/sample.function';

@Controller('api/inngest')
export class InngestController {
  constructor(private readonly inngestService: InngestService) {}

  @All()
  async handleInngest(@Req() req: any, @Res() res: any) {
    const handler = serve({
      client: this.inngestService.inngest,
      functions: [
        // sampleFunction, // Пример функции
      ],
    });

    return handler(req, res);
  }
}

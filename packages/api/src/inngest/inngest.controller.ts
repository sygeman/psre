import { All, Controller, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { serve } from 'inngest/express';
import { InngestService } from './inngest.service';

@Controller('api/inngest')
export class InngestController {
  constructor(private readonly inngestService: InngestService) {}

  @All()
  handleInngest(@Req() req: Request, @Res() res: Response) {
    return serve({
      client: this.inngestService.getInngestClient(),
      functions: this.inngestService.getFunctions(),
    })(req, res);
  }
}

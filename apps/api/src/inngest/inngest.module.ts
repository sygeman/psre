import { Module } from '@nestjs/common';
import { InngestService } from './inngest.service';
import { InngestController } from './inngest.controller';

@Module({
  providers: [InngestService],
  controllers: [InngestController],
  exports: [InngestService],
})
export class InngestModule {}

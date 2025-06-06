import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { InngestController } from './inngest.controller';
import { InngestService } from './inngest.service';
import { InngestExplorerService } from './services/inngest-explorer.service';

@Module({
  imports: [DiscoveryModule],
  controllers: [InngestController],
  providers: [InngestService, InngestExplorerService],
  exports: [InngestService],
})
export class InngestModule {}

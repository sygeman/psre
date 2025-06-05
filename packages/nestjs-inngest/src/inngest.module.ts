import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { InngestService } from './inngest.service'
import { InngestController } from './inngest.controller'
import { InngestDiscoveryService } from './inngest-discovery.service'

@Module({
  imports: [DiscoveryModule],
  providers: [InngestService, InngestDiscoveryService],
  controllers: [InngestController],
  exports: [InngestService],
})
export class InngestModule {}

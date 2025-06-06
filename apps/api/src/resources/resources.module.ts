import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesInngestService } from './resources.inngest.service';

@Module({
  providers: [ResourcesService, ResourcesResolver, ResourcesInngestService],
  exports: [ResourcesService],
})
export class ResourcesModule {}

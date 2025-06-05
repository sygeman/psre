import { SetMetadata } from '@nestjs/common'
import { INNGEST_TRIGGER_METADATA } from '../constants'
import { InngestTriggerConfig } from '../interfaces'

export const InngestTrigger = (config: InngestTriggerConfig): MethodDecorator =>
  SetMetadata(INNGEST_TRIGGER_METADATA, config)

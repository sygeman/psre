import { SetMetadata } from '@nestjs/common'
import { INNGEST_FUNCTION_METADATA } from '../constants'
import { InngestFunctionConfig } from '../interfaces'

export const InngestFunction = (config: InngestFunctionConfig): MethodDecorator =>
  SetMetadata(INNGEST_FUNCTION_METADATA, config)

import { SetMetadata } from '@nestjs/common';

export interface InngestFunctionConfig {
  id: string;
  name?: string;
}

export const INNGEST_FUNCTION_METADATA = 'inngest:function';

export const InngestFunction = (config: InngestFunctionConfig) => {
  return SetMetadata(INNGEST_FUNCTION_METADATA, config);
};

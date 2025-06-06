import { SetMetadata } from '@nestjs/common';

export interface InngestTriggerConfig {
  event: string;
  cron?: string;
}

export const INNGEST_TRIGGER_METADATA = 'inngest:trigger';

export const InngestTrigger = (config: InngestTriggerConfig) => {
  return SetMetadata(INNGEST_TRIGGER_METADATA, config);
};

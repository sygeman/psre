import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { inngest } from '../../lib/inngest';
import {
  INNGEST_FUNCTION_METADATA,
  InngestFunctionConfig,
} from '../decorators/inngest-function.decorator';
import {
  INNGEST_TRIGGER_METADATA,
  InngestTriggerConfig,
} from '../decorators/inngest-trigger.decorator';
import { InngestContext } from '../interfaces/inngest-context.interface';

export interface RegisteredInngestFunction {
  instance: any;
  methodName: string;
  config: InngestFunctionConfig;
  trigger: InngestTriggerConfig;
  inngestFunction: any;
}

@Injectable()
export class InngestExplorerService implements OnModuleInit {
  private readonly functions: RegisteredInngestFunction[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.exploreInngestFunctions();
  }

  private exploreInngestFunctions() {
    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getProviders(),
      ...this.discoveryService.getControllers(),
    ];

    instanceWrappers
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter((wrapper) => wrapper.instance)
      .forEach((wrapper) => {
        this.metadataScanner.scanFromPrototype(
          wrapper.instance,
          Object.getPrototypeOf(wrapper.instance),
          (methodName: string) =>
            this.exploreMethodMetadata(wrapper.instance, methodName),
        );
      });
  }

  private exploreMethodMetadata(instance: any, methodName: string) {
    const functionConfig = this.reflector.get<InngestFunctionConfig>(
      INNGEST_FUNCTION_METADATA,
      instance[methodName],
    );

    const triggerConfig = this.reflector.get<InngestTriggerConfig>(
      INNGEST_TRIGGER_METADATA,
      instance[methodName],
    );

    if (functionConfig && triggerConfig) {
      const inngestFunction = this.createInngestFunction(
        instance,
        methodName,
        functionConfig,
        triggerConfig,
      );

      this.functions.push({
        instance,
        methodName,
        config: functionConfig,
        trigger: triggerConfig,
        inngestFunction,
      });
    }
  }

  private createInngestFunction(
    instance: any,
    methodName: string,
    config: InngestFunctionConfig,
    trigger: InngestTriggerConfig,
  ) {
    const triggerOptions: any = { event: trigger.event };
    if (trigger.cron) {
      triggerOptions.cron = trigger.cron;
    }

    return inngest.createFunction(
      { id: config.id, name: config.name },
      triggerOptions,
      async (context: InngestContext) => {
        return await instance[methodName](context);
      },
    );
  }

  getFunctions() {
    return this.functions.map((f) => f.inngestFunction);
  }
}

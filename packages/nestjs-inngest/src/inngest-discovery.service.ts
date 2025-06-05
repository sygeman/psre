import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { INNGEST_FUNCTION_METADATA, INNGEST_TRIGGER_METADATA } from './constants'
import {
  InngestFunctionConfig,
  InngestTriggerConfig,
  InngestFunctionMetadata,
  InngestContext,
} from './interfaces'
import { InngestService } from './inngest.service'

@Injectable()
export class InngestDiscoveryService implements OnModuleInit {
  private readonly logger = new Logger(InngestDiscoveryService.name)
  private readonly functions: InngestFunctionMetadata[] = []

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly inngestService: InngestService
  ) {}

  onModuleInit() {
    this.discoverInngestFunctions()
    this.registerFunctions()
  }

  private discoverInngestFunctions() {
    const providers = this.discoveryService.getProviders()
    const controllers = this.discoveryService.getControllers()

    const allWrappers = [...providers, ...controllers]

    for (const wrapper of allWrappers) {
      this.scanWrapperForFunctions(wrapper)
    }
  }

  private scanWrapperForFunctions(wrapper: InstanceWrapper<unknown>) {
    const { instance, metatype } = wrapper

    if (!instance || !metatype || typeof instance !== 'object') {
      return
    }

    const prototype = Object.getPrototypeOf(instance)
    if (!prototype) return

    const methodNames = this.metadataScanner.scanFromPrototype(
      instance,
      prototype,
      (methodName: string) => methodName
    )

    for (const methodName of methodNames) {
      this.checkMethodForInngestDecorators(instance, methodName)
    }
  }

  private checkMethodForInngestDecorators(instance: object, methodName: string) {
    if (!(methodName in instance)) return

    const method = (instance as Record<string, unknown>)[methodName]
    if (typeof method !== 'function') return

    const functionConfig = this.reflector.get<InngestFunctionConfig>(
      INNGEST_FUNCTION_METADATA,
      method
    )

    const triggerConfig = this.reflector.get<InngestTriggerConfig>(INNGEST_TRIGGER_METADATA, method)

    if (functionConfig && triggerConfig) {
      this.functions.push({
        config: functionConfig,
        trigger: triggerConfig,
        methodName,
        target: instance,
      })

      this.logger.log(
        `Discovered Inngest function: ${functionConfig.id} (${methodName}) -> ${triggerConfig.event}`
      )
    }
  }

  private registerFunctions() {
    const inngestFunctions = this.functions.map(metadata => {
      return this.inngestService.inngest.createFunction(
        { id: metadata.config.id },
        { event: metadata.trigger.event },
        async (context: InngestContext) => {
          const method = (metadata.target as Record<string, unknown>)[metadata.methodName]

          if (typeof method === 'function') {
            const boundMethod = method.bind(metadata.target)
            const result = await boundMethod(context)
            return result
          }

          throw new Error(`Method ${metadata.methodName} is not a function`)
        }
      )
    })

    this.inngestService.addFunctions(inngestFunctions)
    this.logger.log(`Registered ${inngestFunctions.length} Inngest functions`)
  }

  getFunctions() {
    return this.functions
  }
}

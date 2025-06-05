export interface InngestFunctionConfig {
  id: string
  name?: string
  concurrency?:
    | number
    | {
        limit: number
        scope?: string
      }
  batchEvents?: {
    maxSize: number
    timeout?: string
  }
  cancelOn?: Array<{
    event: string
    if?: string
  }>
  debounce?: {
    period: string
    key?: string
  }
  rateLimit?: {
    limit: number
    period: string
    key?: string
  }
  retries?: number
}

export interface InngestTriggerConfig {
  event: string
  if?: string
  cron?: string
}

export interface InngestFunctionMetadata {
  config: InngestFunctionConfig
  trigger: InngestTriggerConfig
  methodName: string
  target: object
}

export type InngestContext<T = Record<string, unknown>> = {
  event: {
    id: string
    name: string
    data: T
    timestamp: number
    user?: Record<string, unknown>
  }
  step: {
    run<K>(id: string, handler: () => Promise<K> | K): Promise<K>
    sendEvent(
      id: string,
      events: Record<string, unknown> | Record<string, unknown>[]
    ): Promise<void>
    waitForEvent(
      id: string,
      options: {
        event: string
        timeout: string
        if?: string
      }
    ): Promise<Record<string, unknown>>
    sleep(id: string, duration: string): Promise<void>
    sleepUntil(id: string, datetime: string | Date): Promise<void>
  }
}

export interface InngestFunctionInstance {
  id: string
  handler: (context: InngestContext) => Promise<unknown>
}

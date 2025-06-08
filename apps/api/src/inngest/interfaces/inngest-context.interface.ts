export interface InngestEvent<T = any> {
  data: T;
  name: string;
  ts: string;
  id: string;
}

export interface InngestStep {
  run<T>(id: string, fn: () => Promise<T> | T): Promise<T>;
  sleep(id: string, duration: string): Promise<void>;
  waitForEvent(
    id: string,
    options: {
      event: string;
      timeout: string;
      match?: string;
    },
  ): Promise<any>;
}

export interface InngestContext<TEvent = any> {
  event: InngestEvent<TEvent>;
  step: InngestStep;
}

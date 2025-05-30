import { inngest } from "../client";

export const helloWorld = inngest.createFunction(
    { id: 'hello-world' },
    { event: 'hello-world'},
    async ({ event }) => {
      console.log('Function called', event);
    }
  );
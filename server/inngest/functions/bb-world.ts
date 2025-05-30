import { inngest } from "../client";

export default inngest.createFunction(
    { id: 'bb-world' },
    { event: 'bb-world'},
    async ({ event }) => {
      console.log('Function called', event);
    }
  );
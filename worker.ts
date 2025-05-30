import { Inngest } from 'inngest'
import { serve } from "inngest/bun";

const inngest = new Inngest({ id: 'psre' });

const handleSignupFunction = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'hello-world'},
  async ({ event }) => {
    console.log('Function called', event);
  }
);

export const prepareWeeklyDigest = inngest.createFunction(
    { id: "prepare-weekly-digest" },
    { cron: "TZ=Europe/Moscow * * * * *" },
    async ({ step }) => {
      console.log('Prepare weekly digest');
    }
  );


const functions = [handleSignupFunction, prepareWeeklyDigest]

Bun.serve({
    port: 4000,
    fetch(request: Request) {
      const url = new URL(request.url);
  
      if (url.pathname === "/api/inngest") {
        return serve({ client: inngest, functions })(request);
      }
  
      return new Response("Not found", { status: 404 });
    },
  });
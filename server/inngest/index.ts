import { Handler } from "elysia";
import { helloWorld } from "./functions/hello-world";
import { prepareWeeklyDigest } from "./functions/prepare-weekly-digest";
import { serve } from "inngest/bun";
import { inngest } from "./client";

export const functions = [helloWorld, prepareWeeklyDigest];

export const inngestHandler: Handler = ({ request }) => serve({
    client: inngest,
    functions,
})(request);

export { inngest };
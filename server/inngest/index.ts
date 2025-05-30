import { Handler } from "elysia";
import { serve } from "inngest/bun";
import { inngest } from "./client";
import { loadFunctions } from "./utils/load-functions";

// Загружаем функции
export const functions = await loadFunctions();

export const inngestHandler: Handler = ({ request }) => serve({
    client: inngest,
    functions,
})(request);

export { inngest };
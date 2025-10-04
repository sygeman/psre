import { chatCleanupEventHandler } from "./events/chat-cleanup";
import { chatMessageCreatedEventHandler } from "./events/chat-message-created";

export { buildChatModule } from "./chat.resolver";
export const inngestChatFunctions = [
  chatMessageCreatedEventHandler,
  chatCleanupEventHandler,
];

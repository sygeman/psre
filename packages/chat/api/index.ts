import { chatCleanupEventHandler } from "./events/chat-cleanup";
import { chatMessageCreatedEventHandler } from "./events/chat-message-created";
import { testChat } from "./test";

export { buildChatModule } from "./chat.resolver";
export const inngestFunctions = [
  chatMessageCreatedEventHandler,
  chatCleanupEventHandler,
];

testChat();

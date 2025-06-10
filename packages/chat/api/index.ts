import { chatMessageCreatedEventHandler } from "./events/chat-message-created";

export { buildChatModule } from "./chat.resolver";
export const inngestFunctions = [chatMessageCreatedEventHandler];

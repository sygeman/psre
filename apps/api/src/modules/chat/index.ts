import { chatCleanupEventHandler } from "./events/chat-cleanup"
import { chatMessageCreatedEventHandler } from "./events/chat-message-created"

export const inngestChatFunctions = [chatMessageCreatedEventHandler, chatCleanupEventHandler]

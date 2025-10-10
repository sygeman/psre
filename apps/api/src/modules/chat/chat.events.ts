export const CHAT_EVENTS = {
  MESSAGE_CREATED: "chat/message.created",
  CHAT_CLEANUP: "chat/cleanup",
  CREATE: 'chat/create'
} as const;

export const CHAT_FUNCTION_IDS = {
  MESSAGE_HANDLER: "chat-message-handler",
  CHAT_CLEANUP_HANDLER: "chat-cleanup-handler",
  CREATE: 'create-chat-handler'
} as const;

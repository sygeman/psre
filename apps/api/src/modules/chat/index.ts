import { chatCleanupEventHandler } from "./events/chat-cleanup";
import { chatMessageCreatedEventHandler } from "./events/chat-message-created";
import './queries/chats';
import './queries/chat-messages';
import './mutations/create-chat-message';
import './subscriptions/chat-cleanup'
import './subscriptions/created-chat-message'

export const inngestChatFunctions = [
  chatMessageCreatedEventHandler,
  chatCleanupEventHandler,
];

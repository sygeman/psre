import { builder } from "@/lib/builder";
import { inngest } from "@/lib/inngest";
import { ChatMessage } from "./types/chat-message.type";
import { SendMessageInput } from "./types/send-message.input";
import { CHAT_EVENTS } from "./chat.events";
import { Chat } from "./types/chat.type";
import { getChats } from "./service/get-chats";
import './service/get-chats'

export const buildChatModule = () => {
  // builder.queryType({
  //   fields: (t) => ({
  //     chats: t.field({
  //       type: [Chat],
  //       resolve: (_parent, _args, { currentAccountId }) =>
  //         getChats({ currentAccountId }),
  //     }),
  //   }),
  // });

  builder.queryType({
    fields: (t) => ({
      chatMessages: t.field({
        type: [ChatMessage],
        args: {
          chatId: t.arg({ type: 'String', required: true }),
        },
        resolve: (_parent, { chatId }) => {
          console.log('get messages for ', chatId)
          return []
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createChatMessage: t.boolean({
        args: {
          input: t.arg({ type: SendMessageInput, required: true }),
        },
        resolve: async (_parent, { input }, { currentAccountId }) => {
          console.log({ currentAccountId });
          await inngest.send({
            name: CHAT_EVENTS.MESSAGE_CREATED,
            data: { ...input, currentAccountId },
          });
          return true;
        },
      }),
    }),
  });

  builder.subscriptionType({
    fields: (t) => ({
      createdChatMessage: t.field({
        type: ChatMessage,
        args: {
          chatId: t.arg.string(),
        },
        subscribe: (_parent, { chatId }, { pubsub }) => {
          return pubsub.subscribe("createdChatMessage", chatId);
        },
        resolve: (message) => message,
      }),
    }),
  });

  builder.subscriptionType({
    fields: (t) => ({
      chatCleanup: t.boolean({
        args: {
          chatId: t.arg.string(),
        },
        subscribe: (_parent, { chatId }, { pubsub }) => {
          return pubsub.subscribe("chatCleanup", chatId);
        },
        resolve: (message) => message,
      }),
    }),
  });
};

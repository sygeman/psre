import { directus } from "@/lib/directus";
import { ChatChannel, chatStore } from "@/stores/chat";

export const chatSubscription = async (type: ChatChannel, regionChatId: string) => {
    const { subscription } = await directus.subscribe('psre_chat_message', {
        query: { filter: { chat_id: { _eq: regionChatId } }, fields: ['*.*'], },
        event: 'create',
        uid: `${type}-chat-new-message`,
      });

      for await (const item of subscription) {
        if (
          item.event === 'create' &&
          Array.isArray(item.data) &&
          item.data.length > 0
        ) {
          chatStore.addMessagesToChannel(type, [item.data[0]])
        }
      }
}
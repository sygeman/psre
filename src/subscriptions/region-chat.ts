import { directus } from "@/lib/directus";


export const regionChatSubscription = async (regionChatId: string) => {
    const { subscription } = await directus.subscribe('psre_chats', {
        query: { filter: { id: { _eq: regionChatId } } },
        event: 'update',
        uid: 'update-region-chat',
      });

      for await (const item of subscription) {
        if (
          item.event === 'update' &&
          Array.isArray(item.data) &&
          item.data.length > 0
        ) {
          console.log(item.data[0])
          // updateStateFromData(item.data[0]);
        }
      }
}
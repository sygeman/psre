import { deleteItems } from "@directus/sdk";
import { directus } from "@/lib/directus";

export const chatCleanup = async ({ chatId }) => {
  return await directus.request(
    deleteItems("psre_chat_message", {
      filter: {
        chat_id: {
          _eq: chatId,
        },
      },
      limit: -1,
    }),
  );
};

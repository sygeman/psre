

export const chatCleanup = async ({ chatId }) => {
  return false;
  // return await directus.request(
  //   deleteItems("psre_chat_message", {
  //     filter: {
  //       chat_id: {
  //         _eq: chatId,
  //       },
  //     },
  //     limit: -1,
  //   }),
  // );
};

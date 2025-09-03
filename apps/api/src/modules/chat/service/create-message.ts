
// const CREATE_CHAT_MESSAGE_MUTATION = gql`
//   mutation CreateChatMessage($data: create_psre_chat_message_input!) {
//     create_psre_chat_message_item(data: $data) {
//       id
//       content
//       author {
//         id
//         name
//       }
//       date_created
//     }
//   }
// `;

export const createMessage = async ({ content, authorId, chatId }) => {
  // const { create_psre_chat_message_item } = await directus.query(
  //   CREATE_CHAT_MESSAGE_MUTATION,
  //   {
  //     data: {
  //       author: { id: authorId },
  //       content,
  //       chat_id: { id: chatId },
  //     },
  //   },
  // );

  // return create_psre_chat_message_item;
  return null;
};

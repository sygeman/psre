import { createItem, deleteItems, updateItem } from "@directus/sdk";
import { directus } from "./src/lib/directus";

function getRandomInt(n: number) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
      throw new Error('n должно быть целым числом больше 0');
    }
    return Math.floor(Math.random() * n) + 1;
  }

// const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';

// setInterval(async () => {
//     await directus.request(updateItem('psre_account_state', stateId, {
//         action_points: getRandomInt(9999),
//         stamina_points: getRandomInt(9999),
//         level: getRandomInt(100),
//         food: getRandomInt(10000000),
//         wood: getRandomInt(10000000),
//         steel: getRandomInt(10000000),
//         fuel: getRandomInt(10000000),
//         diamond: getRandomInt(100000),
//         power: getRandomInt(1000000),
//         serum: getRandomInt(1000000),
//     }))
// }, 3000)

const regionChatId = 'def67dc7-39ca-4f13-a816-6f53c115d869'
const allianceChatId = '52b49c7a-5b8a-40b9-95af-c31be0c8e39b'

const accountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';

await directus.request(deleteItems('psre_chat_message', {
  filter: { chat_id: { _eq: regionChatId }, },
  limit: -1
}))

await directus.request(deleteItems('psre_chat_message', {
  filter: { chat_id: { _eq: allianceChatId } },
  limit: -1
}))

setInterval(async () => {
  await directus.request(createItem('psre_chat_message', {
      chat_id: regionChatId,
      content: `Тестовое сообщение в чат региона - ${getRandomInt(100000)}`,
      author: accountId
  }))

  await directus.request(createItem('psre_chat_message', {
    chat_id: allianceChatId,
    content: `Тестовое сообщение в чат альянса - ${getRandomInt(100000)}`,
    author: accountId
}))
}, 3000)

   

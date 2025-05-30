import { Elysia } from 'elysia'
import { Inngest } from 'inngest'
import { serve } from "inngest/bun";

const inngest = new Inngest({ id: 'psre' });

const handleSignupFunction = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'hello-world'},
  async ({ event }) => {
    console.log('Function called', event);
  }
);

export const prepareWeeklyDigest = inngest.createFunction(
    { id: "prepare-weekly-digest" },
    { cron: "TZ=Europe/Moscow * * * * *" },
    async ({ step }) => {
      console.log('Prepare weekly digest');
    }
  );


const functions = [handleSignupFunction, prepareWeeklyDigest];

new Elysia()
    .get('/', async () => {
        await inngest.send({
            name: "hello-world",
            data: {
                message: "Hello Elysia"
            }
        })
        
        return {
            message: "Hello Elysia"
        }
    })
    .all('/api/inngest', async ({ request }) => serve({ client: inngest, functions })(request)) 
    .listen(4000, async () => {
        console.log("Server is running on http://localhost:3333");
    })

// import { createItem, deleteItems, updateItem } from "@directus/sdk";
// import { directus } from "./src/lib/directus";

// function getRandomInt(n: number) {
//     if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
//       throw new Error('n должно быть цserелым числом больше 0');
//     }
//     return Math.floor(Math.random() * n) + 1;
//   }

// const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';

// setInterval(async () => {
//     await directus.request(updateItem('psre_account_state', stateId, {
//         action_points: getRandomInt(120),
//         stamina_points: getRandomInt(120),
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

// const regionChatId = 'def67dc7-39ca-4f13-a816-6f53c115d869'
// const allianceChatId = '52b49c7a-5b8a-40b9-95af-c31be0c8e39b'

// const accountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';

// setInterval(async () => {
//   await directus.request(deleteItems('psre_chat_message', {
//     filter: { chat_id: { _eq: regionChatId }, },
//     limit: -1
//   }))
  
//   await directus.request(deleteItems('psre_chat_message', {
//     filter: { chat_id: { _eq: allianceChatId } },
//     limit: -1
//   }))
// }, 20000)

// const regionMessages = [
//   "Кто-нибудь хочет объединиться для рейда?",
//   "Продам редкие ресурсы, пишите в ЛС",
//   "Ищем активных игроков в топ альянс",
//   "Народ, где лучше фармить сталь?",
//   "В секторе 7 замечена вражеская активность",
//   "Обменяю 1000 дерева на 800 стали",
//   "Кто может помочь с прокачкой?",
//   "Сервер лагает или только у меня?",
//   "Собираем пати на босса в 21:00"
// ];

// const allianceMessages = [
//   "Общий сбор через 30 минут!",
//   "Не забываем про ежедневные задания альянса",
//   "Нужна помощь с защитой базы",
//   "Кто может поделиться ресурсами на развитие?",
//   "Внимание! Готовимся к межсерверному событию",
//   "У кого есть лишние чертежи?",
//   "Обсудим тактику на следующую войну альянсов?",
//   "Поздравляем новых членов альянса!",
//   "Давайте координировать атаки в секторе 5"
// ];

// setInterval(async () => {
//   await directus.request(createItem('psre_chat_message', {
//       chat_id: regionChatId,
//       content: regionMessages[Math.floor(Math.random() * regionMessages.length)],
//       author: accountId
//   }));

//   await directus.request(createItem('psre_chat_message', {
//     chat_id: allianceChatId,
//     content: allianceMessages[Math.floor(Math.random() * allianceMessages.length)],
//     author: accountId
//   }));
// }, 3000);

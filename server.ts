import { updateItem } from "@directus/sdk";
import { directus } from "./src/lib/directus";

function getRandomInt(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
      throw new Error('n должно быть целым числом больше 0');
    }
    return Math.floor(Math.random() * n) + 1;
  }

const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';

setInterval(async () => {
    await directus.request(updateItem('psre_account_state', stateId, {
        action_points: getRandomInt(9999),
        stamina_points: getRandomInt(9999),
        level: getRandomInt(100),
        food: getRandomInt(10000000),
        wood: getRandomInt(10000000),
        steel: getRandomInt(10000000),
        fuel: getRandomInt(10000000),
        diamond: getRandomInt(100000)
    }))
}, 1000)


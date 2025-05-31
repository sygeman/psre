import { updateItem } from "@directus/sdk";
import { directus } from "../../lib/directus";
import { randomInt } from "../utils/random-int";
import { inngest } from "../client";
import { CronTime } from "cron-time-generator";

export default inngest.createFunction(
    { id: "test-random-state" },
    { cron: `TZ=Europe/Moscow ${CronTime.everyMinute()}` },
    async () => {

      const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';

      await directus.request(updateItem('psre_account_state', stateId, {
          action_points: randomInt(120),
          stamina_points: randomInt(120),
          level: randomInt(100),
          food: randomInt(10000000),
          wood: randomInt(10000000),
          steel: randomInt(10000000),
          fuel: randomInt(10000000),
          diamond: randomInt(100000),
          power: randomInt(1000000),
          serum: randomInt(1000000),
      }))

    }
  );
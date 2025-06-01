import { deleteItems } from "@directus/sdk";
import { directus } from "../../lib/directus";
import { inngest } from "../client";
import { CronTime } from "cron-time-generator";

export default inngest.createFunction(
    { id: "clear-expired-tokens" },
    { cron: `TZ=Europe/Moscow ${CronTime.everyMinute()}` },
    async () => {
      return await directus.request(deleteItems('psre_auth_tokens', {
          filter: {
            verify: { _eq: false },
            date_created: { _lt: new Date(Date.now() - 1000 * 60 ) }, // 1 минута
          }
      }))
    }
  );
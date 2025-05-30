import { inngest } from "../client";
import { CronTime } from "cron-time-generator";

export default inngest.createFunction(
    { id: "every-minute-test" },
    { cron: `TZ=Europe/Moscow ${CronTime.everyMinute()}` },
    async () => {
      console.log('Every minute test');
    }
  );
import { inngest } from "../client";

export const prepareWeeklyDigest = inngest.createFunction( // prepare-weekly-digest
    { id: "prepare-weekly-digest" },
    { cron: "TZ=Europe/Moscow * * * * *" },
    async ({ step }) => {
      console.log('Prepare weekly digest');
    }
  );
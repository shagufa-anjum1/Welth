import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { name: "Check Budget Alert" },
  { cron: "0 */6 * * *" },
  async ({ event, step }) => {
  },
);

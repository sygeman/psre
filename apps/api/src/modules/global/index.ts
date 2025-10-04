import { createRegion } from "../region/service/create-region";
import { seedEventHandler } from "./events/seed";

export const inngestGlobalFunctions = [
  seedEventHandler,
  createRegion
];

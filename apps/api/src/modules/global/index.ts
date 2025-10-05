import { createAccount } from "../account/events/create-account";
import { renameAccount } from "../account/events/rename-account";
import { createRegion } from "../region/service/create-region";
import { createUser } from "../user/events/create-user";
import { seedEventHandler } from "./events/seed";

export const inngestGlobalFunctions = [
  seedEventHandler,
  createRegion,
  createUser,
  createAccount,
  renameAccount
];

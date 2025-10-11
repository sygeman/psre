import { createAccount } from "../account/events/create-account"
import { renameAccount } from "../account/events/rename-account"
import { createAlliance } from "../alliance/service/create-alliance"
import { createChat } from "../chat/events/create-chat"
import { createRegion } from "../region/service/create-region"
import { createUser } from "../user/events/create-user"
import { seedEventHandler } from "./events/seed"

export const inngestGlobalFunctions = [
  seedEventHandler,
  createRegion,
  createUser,
  createAccount,
  renameAccount,
  createChat,
  createAlliance,
]

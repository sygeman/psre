export { createAccount } from "@/modules/account/events/create-account"
export { renameAccount } from "@/modules/account/events/rename-account"
export { createAlliance } from "@/modules/alliance/events/create-alliance"
export { collectBuilding } from "@/modules/buildings/events/collect"
export { cleanupChat } from "@/modules/chat/events/cleanup-chat"
export { createChat } from "@/modules/chat/events/create-chat"
export { createChatMessage } from "@/modules/chat/events/create-chat-message"
export { seed } from "@/modules/global/events/seed"
export { createRegion } from "@/modules/region/events/create-region"
export { createUser } from "@/modules/user/events/create-user"

import type { CreateAccountHandler } from "@/modules/account/events/create-account"
import type { CreateUserHandler } from "@/modules/user/events/create-user"

export type Events = {
  "chat/cleanup": {
    data: {
      chatId: string
    }
  }
  "chat/create": {
    data?: undefined
  }
  "account/rename": {
    data: {
      accountId: string
      name: string
    }
  }
  "alliance/create": {
    data: { regionId: string; ownerId: string }
  }
  "region/create": {
    data?: undefined
  }
  "user/create": {
    data: {
      telegramId: string
      token?: string
      name?: string
    }
  }
  "global/seed": {
    data: {
      telegramId: string
      name: string
    }
  }
  "building/collect": {
    data: {
      accountId: string
      type: string
    }
  }
} & CreateUserHandler &
  CreateAccountHandler

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

export type Events = {
  "chat/create-message": {
    data: {
      currentAccountId: string
      chatId: string
      content: string
    }
  }
  "chat/cleanup": {
    data: {
      chatId: string
    }
  }
  "chat/create": {
    data?: unknown
  }
  "account/create": {
    data: {
      userId: string
      regionId?: string
      name?: string
    }
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
    data?: unknown
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
}

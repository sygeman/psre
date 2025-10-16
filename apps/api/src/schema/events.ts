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

import type { AccountCreateHandler } from "@/modules/account/events/create-account"
import type { AccountRenameHandler } from "@/modules/account/events/rename-account"
import type { AllianceCreateHandler } from "@/modules/alliance/events/create-alliance"
import type { BuildingCollectHandler } from "@/modules/buildings/events/collect"
import type { ChatCleanupHandler } from "@/modules/chat/events/cleanup-chat"
import type { ChatCreateHandler } from "@/modules/chat/events/create-chat"
import type { ChatCreateMessageHandler } from "@/modules/chat/events/create-chat-message"
import type { GlobalSeedHandler } from "@/modules/global/events/seed"
import type { RegionCreateHandler } from "@/modules/region/events/create-region"
import type { UserCreateHandler } from "@/modules/user/events/create-user"

export type Events = AllianceCreateHandler &
  UserCreateHandler &
  AccountCreateHandler &
  GlobalSeedHandler &
  RegionCreateHandler &
  ChatCleanupHandler &
  ChatCreateHandler &
  ChatCreateMessageHandler &
  BuildingCollectHandler &
  AccountRenameHandler

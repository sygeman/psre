export { createAccount } from "@/modules/account/events/create-account"
export { renameAccount } from "@/modules/account/events/rename-account"
export { createAlliance } from "@/modules/alliance/events/create-alliance"
export { changedBuilding } from "@/modules/buildings/events/changed"
export { collectBuilding } from "@/modules/buildings/events/collect"
export { createBuilding } from "@/modules/buildings/events/create"
export { upgradeBuilding } from "@/modules/buildings/events/upgrade"
export { cleanupChat } from "@/modules/chat/events/cleanup-chat"
export { createChat } from "@/modules/chat/events/create-chat"
export { createChatMessage } from "@/modules/chat/events/create-chat-message"
export { seed } from "@/modules/global/events/seed"
export { createRegion } from "@/modules/region/events/create-region"
export { resourcesMainChange } from "@/modules/resources/events/resources-main-change"
export { createUser } from "@/modules/user/events/create-user"

import type { AccountCreateHandler } from "@/modules/account/events/create-account"
import type { AccountRenameHandler } from "@/modules/account/events/rename-account"
import type { AllianceCreateHandler } from "@/modules/alliance/events/create-alliance"
import type { BuildingChangedHandler } from "@/modules/buildings/events/changed"
import type { BuildingCollectHandler } from "@/modules/buildings/events/collect"
import type { BuildingCreateHandler } from "@/modules/buildings/events/create"
import type { BuildingUpgradeHandler } from "@/modules/buildings/events/upgrade"
import type { ChatCleanupHandler } from "@/modules/chat/events/cleanup-chat"
import type { ChatCreateHandler } from "@/modules/chat/events/create-chat"
import type { ChatCreateMessageHandler } from "@/modules/chat/events/create-chat-message"
import type { GlobalSeedHandler } from "@/modules/global/events/seed"
import type { RegionCreateHandler } from "@/modules/region/events/create-region"
import type { ResourcesMainChangeHandler } from "@/modules/resources/events/resources-main-change"
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
  AccountRenameHandler &
  BuildingCreateHandler &
  ResourcesMainChangeHandler &
  BuildingUpgradeHandler &
  BuildingChangedHandler

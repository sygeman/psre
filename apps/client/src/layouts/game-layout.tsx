import { JSX } from "solid-js"

import { ResourcesPanel } from "@/modules/resources"
import { MiniChat } from "@/modules/chat"

import { BottomMenu } from "@/modules/bottom-menu"
import { PersonPanel } from "@/modules/person-panel"
import { PowerPanel } from "@/modules/power-panel"

import { ToastNotifications } from "@/components/toast-notifications"
import { MiniGamesButton } from "@/components/mini-games-button"

type GameLayoutProps = {
  children: JSX.Element
}

export function GameLayout(props: GameLayoutProps) {
  return (
    <div class="relative flex h-screen flex-col">
      <div class="absolute top-8 z-0 h-[calc(100%-64px-32px)] w-full overflow-hidden">{props.children}</div>
      <ToastNotifications />
      <div class="absolute top-0 z-10 flex w-full shrink-0">
        <ResourcesPanel />
      </div>
      <div class="absolute top-8 z-10 flex shrink-0">
        <PersonPanel />
      </div>
      <div class="absolute top-8 left-24 z-10 flex shrink-0">
        <PowerPanel />
      </div>
      <div class="absolute top-10 right-2 z-10 flex shrink-0">
        <MiniGamesButton />
      </div>
      <div class="absolute bottom-16 z-10 w-full">
        <MiniChat />
      </div>
      <div class="absolute bottom-0 z-10 w-full">
        <BottomMenu />
      </div>
    </div>
  )
}

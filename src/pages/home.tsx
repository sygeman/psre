import { createEffect, onCleanup } from "solid-js";
import { BottomMenu } from "../modules/bottom-menu";
import { PersonPanel } from "../modules/person-panel";
import { ResourcesPanel } from "../modules/resources-panel";
import { PowerPanel } from "../modules/power-panel";

export function HomePage() {
  return (
    <div class="relative flex flex-col h-screen">
      <ResourcesPanel />
      <div class="absolute top-8 flex shrink-0">
        <PersonPanel />
      </div>
      <div class="absolute top-8 left-24 flex shrink-0">
        <PowerPanel />
      </div>
      <div class="flex h-[calc(100%-96px)] bg-slate-500 justify-center items-center">
        Карта базы
      </div>
      <BottomMenu />
    </div>
  );
}

import { BottomMenu } from "../modules/bottom-menu";
import { Map } from "../modules/map";
import { PersonPanel } from "../modules/person-panel";
import { ResourcesPanel } from "../modules/resources-panel";

export function HomePage() {
  return (
    <div class="relative flex flex-col h-screen">
      <ResourcesPanel />
      <div class="absolute top-8 flex shrink-0">
        <PersonPanel />
      </div>
      <div class="flex h-[calc(100%-96px)] bg-slate-500 justify-center items-center">
        <Map />
      </div>
      <BottomMenu />
    </div>
  );
}

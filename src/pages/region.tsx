import { BottomMenu } from "../modules/bottom-menu";
import { PersonPanel } from "../modules/person-panel";
import { ResourcesPanel } from "../modules/resources-panel";

export function RegionPage() {
  return (
    <div class="relative flex flex-col h-screen">
      <ResourcesPanel />
      <div class="absolute top-8 shrink-0">
        <PersonPanel />
      </div>
      <div class="flex h-[calc(100%-96px)] bg-slate-500 justify-center items-center">
        Карта региона
      </div>
      <BottomMenu />
    </div>
  );
}

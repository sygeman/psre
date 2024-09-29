import { BottomMenu } from "../modules/bottom-menu";
import { PersonPanel } from "../modules/person-panel";
import { ResourcesPanel } from "../modules/resources-panel";

export function HomePage() {
  return (
    <div class="relative flex flex-col h-screen">
      <ResourcesPanel />
      <div class="absolute top-8 flex">
        <PersonPanel />
      </div>
      <div class="flex flex-1 bg-slate-500 justify-center items-center">
        Карта базы
      </div>
      <BottomMenu />
    </div>
  );
}

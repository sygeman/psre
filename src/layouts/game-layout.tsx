import { JSX } from 'solid-js';
import { BottomMenu } from '@/modules/bottom-menu';
import { PersonPanel } from '@/modules/person-panel';
import { PowerPanel } from '@/modules/power-panel';
import { ResourcesPanel } from '@/modules/resources-panel';
import { MiniChat } from '@/components/mini-chat';

type GameLayoutProps = {
  children: JSX.Element;
};

export function GameLayout(props: GameLayoutProps) {
  return (
    <div class="relative flex h-screen flex-col">
      <ResourcesPanel />
      <div class="absolute top-8 flex shrink-0">
        <PersonPanel />
      </div>
      <div class="absolute top-8 left-24 flex shrink-0">
        <PowerPanel />
      </div>
      <div class="flex h-[calc(100%-96px)] items-center justify-center bg-slate-500">
        {props.children}
      </div>
      <div class="absolute bottom-16 w-full">
        <MiniChat />
      </div>
      <BottomMenu />
    </div>
  );
}

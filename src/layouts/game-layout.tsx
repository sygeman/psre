import { JSX } from 'solid-js';
import { BottomMenu } from '@/modules/bottom-menu';
import { PersonPanel } from '@/modules/person-panel';
import { PowerPanel } from '@/modules/power-panel';
import { ResourcesPanel } from '@/modules/resources-panel';
import { MiniChat } from '@/components/mini-chat';
import { ToastNotifications } from '@/components/toast-notifications';
type GameLayoutProps = {
  children: JSX.Element;
};

export function GameLayout(props: GameLayoutProps) {
  return (
    <div class="relative flex h-screen flex-col">
      <div class="absolute top-8 w-full h-[calc(100%-64px-32px)] overflow-hidden">
        {props.children}
      </div>
      <ToastNotifications />
      <div class="absolute top-0 w-full flex shrink-0">
        <ResourcesPanel />
      </div>
      <div class="absolute top-8 flex shrink-0">
        <PersonPanel />
      </div>
      <div class="absolute top-8 left-24 flex shrink-0">
        <PowerPanel />
      </div>
      <div class="absolute bottom-16 w-full">
        <MiniChat />
      </div>
      <div class="absolute bottom-0 w-full">
        <BottomMenu />
      </div>
    </div>
  );
}

import { For } from 'solid-js';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: Tab['id'];
  onTabChange: (id: Tab['id']) => void;
}

export function Tabs(props: TabsProps) {
  return (
    <div class="flex bg-slate-800">
      <For each={props.tabs}>
        {(tab) => (
          <div
            class={`flex h-10 flex-1 cursor-pointer items-center justify-center text-sm font-medium ${
              tab.id === props.activeTab
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => props.onTabChange(tab.id)}
          >
            {tab.label}
          </div>
        )}
      </For>
    </div>
  );
}

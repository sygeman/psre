import { For } from 'solid-js';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs(props: TabsProps) {
  return (
    <div class="flex bg-slate-800 overflow-x-auto">
      <For each={props.tabs}>
        {(tab) => (
          <div
            class={`px-3 py-2 cursor-pointer transition-colors whitespace-nowrap text-sm ${
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
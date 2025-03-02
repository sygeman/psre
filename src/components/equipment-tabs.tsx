/* eslint-disable no-unused-vars */
import { For } from 'solid-js';
import { Tab } from './tabs';

interface EquipmentTabsProps {
  tabs: Tab[];
  activeTab: Tab['id'];
  onTabChange: (id: Tab['id']) => void;
}

export function EquipmentTabs(props: EquipmentTabsProps) {
  return (
    <div class="flex gap-1">
      <For each={props.tabs}>
        {(tab) => (
          <div
            class={`px-3 py-1.5 cursor-pointer transition-colors whitespace-nowrap text-sm rounded-lg ${
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
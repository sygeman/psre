import { For, createSignal } from 'solid-js';
import { EquipmentSlot } from '../components/equipment-slot';
import { Tab } from '../components/tabs';
import { EquipmentTabs } from '../components/equipment-tabs';

const LEFT_EQUIPMENT_SLOTS = [
  { icon: '⚔️', label: 'Оружие', upgradeLevel: 3 },
  { icon: '🛡️', label: 'Щит', upgradeLevel: 1 },
  { icon: '💍', label: 'Кольцо' },
];

const RIGHT_EQUIPMENT_SLOTS = [
  { icon: '⛑️', label: 'Шлем', upgradeLevel: 2 },
  { icon: '🦺', label: 'Броня', upgradeLevel: 4 },
  { icon: '👢', label: 'Ботинки' },
];

const EQUIPMENT_SETS: Tab[] = [
  { id: 'military', label: 'Военный' },
  { id: 'builder', label: 'Строитель' },
  { id: 'technologist', label: 'Технолог' },
  { id: 'training', label: 'Обучение' },
];

export function EquipmentPage() {
  const [activeSet, setActiveSet] = createSignal('military');

  return (
    <div class="p-4 flex flex-col gap-6">
      <div class="flex gap-4 justify-between">
        {/* Левая колонка */}
        <div class="flex flex-col gap-4">
          <For each={LEFT_EQUIPMENT_SLOTS}>{(slot) => (
            <EquipmentSlot
              icon={slot.icon}
              label={slot.label}
              isEmpty={!slot.upgradeLevel}
              upgradeLevel={slot.upgradeLevel}
            />
          )}</For>
        </div>

        {/* Плейсхолдер для 3D модели */}
        <div class="w-64 bg-slate-800 rounded flex items-center justify-center">
          <div class="text-slate-600 text-sm">3D Модель</div>
        </div>

        {/* Правая колонка */}
        <div class="flex flex-col gap-4">
          <For each={RIGHT_EQUIPMENT_SLOTS}>{(slot) => (
            <EquipmentSlot
              icon={slot.icon}
              label={slot.label}
              isEmpty={!slot.upgradeLevel}
              upgradeLevel={slot.upgradeLevel}
            />
          )}</For>
        </div>
      </div>

      <div class="flex justify-center">
        <EquipmentTabs
          tabs={EQUIPMENT_SETS}
          activeTab={activeSet()}
          onTabChange={setActiveSet}
        />
      </div>
    </div>
  );
} 
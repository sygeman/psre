import { For } from 'solid-js';
import { EquipmentSlot } from '../components/equipment-slot';

const LEFT_EQUIPMENT_SLOTS = [
  { icon: '⚔️', label: 'Оружие' },
  { icon: '🛡️', label: 'Щит' },
  { icon: '💍', label: 'Кольцо' },
];

const RIGHT_EQUIPMENT_SLOTS = [
  { icon: '⛑️', label: 'Шлем' },
  { icon: '🦺', label: 'Броня' },
  { icon: '👢', label: 'Ботинки' },
];

export function EquipmentPage() {
  return (
    <div class="p-4">
      <div class="flex gap-4 justify-between h-full">
        {/* Левая колонка */}
        <div class="flex flex-col gap-4">
          <For each={LEFT_EQUIPMENT_SLOTS}>{(slot) => (
            <EquipmentSlot
              icon={slot.icon}
              label={slot.label}
              isEmpty={true}
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
              isEmpty={true}
            />
          )}</For>
        </div>
      </div>
    </div>
  );
} 
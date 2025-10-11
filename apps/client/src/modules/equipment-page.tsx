import { For, createSignal } from "solid-js"
import { EquipmentSlot } from "@/components/equipment-slot"
import type { Tab } from "@/components/tabs"
import { EquipmentTabs } from "@/components/equipment-tabs"

const LEFT_EQUIPMENT_SLOTS = [
  { icon: "⚔️", label: "Оружие", upgradeLevel: 3, canUpgrade: true, stars: 7 },
  { icon: "🛡️", label: "Щит", upgradeLevel: 1, stars: 3 },
  { icon: "💍", label: "Кольцо" },
]

const RIGHT_EQUIPMENT_SLOTS = [
  { icon: "⛑️", label: "Шлем", upgradeLevel: 2, canUpgrade: true, stars: 11 },
  { icon: "🦺", label: "Броня", upgradeLevel: 4, stars: 5 },
  { icon: "👢", label: "Ботинки" },
]

const EQUIPMENT_SETS: Tab[] = [
  { id: "military", label: "Военный" },
  { id: "builder", label: "Строитель" },
  { id: "technologist", label: "Технолог" },
  { id: "training", label: "Обучение" },
]

export function EquipmentPage() {
  const [activeSet, setActiveSet] = createSignal("military")

  return (
    <div class="flex flex-col gap-6 p-4">
      <div class="flex justify-between gap-4">
        {/* Левая колонка */}
        <div class="flex flex-col gap-4">
          <For each={LEFT_EQUIPMENT_SLOTS}>
            {(slot) => (
              <EquipmentSlot
                icon={slot.icon}
                label={slot.label}
                isEmpty={!slot.upgradeLevel}
                upgradeLevel={slot.upgradeLevel}
                canUpgrade={slot.canUpgrade}
                stars={slot.stars}
              />
            )}
          </For>
        </div>

        {/* Плейсхолдер для 3D модели */}
        <div class="flex w-64 items-center justify-center rounded bg-slate-800">
          <div class="text-sm text-slate-600">3D Модель</div>
        </div>

        {/* Правая колонка */}
        <div class="flex flex-col gap-4">
          <For each={RIGHT_EQUIPMENT_SLOTS}>
            {(slot) => (
              <EquipmentSlot
                icon={slot.icon}
                label={slot.label}
                isEmpty={!slot.upgradeLevel}
                upgradeLevel={slot.upgradeLevel}
                canUpgrade={slot.canUpgrade}
                stars={slot.stars}
              />
            )}
          </For>
        </div>
      </div>

      <div class="flex justify-center">
        <EquipmentTabs tabs={EQUIPMENT_SETS} activeTab={activeSet()} onTabChange={setActiveSet} />
      </div>
    </div>
  )
}

interface EquipmentSlotProps {
  icon: string;
  label: string;
  isEmpty?: boolean;
  upgradeLevel?: number;
}

export function EquipmentSlot(props: EquipmentSlotProps) {
  return (
    <div class="flex flex-col items-center gap-2">
      <div class={`size-16 flex items-center justify-center rounded relative ${
        props.isEmpty ? 'bg-slate-800' : 'bg-slate-700'
      }`}>
        {props.upgradeLevel !== undefined && !props.isEmpty && (
          <div class="absolute left-1 top-1 text-xs font-medium text-cyan-400">
            +{props.upgradeLevel}
          </div>
        )}
        <span class="text-2xl">{props.icon}</span>
      </div>
      <div class="text-sm text-slate-400">{props.label}</div>
    </div>
  );
} 
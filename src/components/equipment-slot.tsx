import { StarIcon } from './star-icon';

interface EquipmentSlotProps {
  icon: string;
  label: string;
  isEmpty?: boolean;
  upgradeLevel?: number;
  canUpgrade?: boolean;
  stars?: number;
}

function renderStars(stars: number | undefined) {
  if (!stars) return null;

  const redStars = Math.floor((stars - 1) / 5);
  const yellowStars = stars > 5 ? 5 : stars;

  return (
    <div class="absolute bottom-0 left-0 right-0">
      <div class="bg-slate-900/80 rounded-b py-0.5">
        <div class="flex justify-center">
          <div class="flex -space-x-0.5">
            {redStars > 0 ? (
              // Красные звезды
              Array.from({ length: redStars }).map(() => (
                <StarIcon class="size-3 text-red-500" />
              ))
            ) : (
              // Желтые звезды
              Array.from({ length: yellowStars }).map(() => (
                <StarIcon class="size-3 text-yellow-400" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EquipmentSlot(props: EquipmentSlotProps) {
  return (
    <div class="flex flex-col items-center gap-2">
      <div class={`size-16 flex items-center justify-center rounded relative ${
        props.isEmpty ? 'bg-slate-800' : 'bg-slate-700'
      }`}>
        {props.upgradeLevel !== undefined && !props.isEmpty && (
          <div class="absolute left-1 top-1 text-xs font-bold text-white" style={{
            "text-shadow": "-1px -1px 0 #0F172A, 1px -1px 0 #0F172A, -1px 1px 0 #0F172A, 1px 1px 0 #0F172A"
          }}>
            +{props.upgradeLevel}
          </div>
        )}
        {props.canUpgrade && !props.isEmpty && (
          <div class="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
        )}
        <span class="text-2xl">{props.icon}</span>
        {!props.isEmpty && renderStars(props.stars)}
      </div>
      <div class="text-sm text-slate-400">{props.label}</div>
    </div>
  );
} 
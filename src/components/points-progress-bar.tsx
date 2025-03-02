import { Accessor, Component, createMemo } from 'solid-js';

type Props = { label: string; points: Accessor<number>; color: string; icon: string };

export const PointsProgressBar: Component<Props> = (props) => {
  const max = 120;
  const progress = createMemo(() =>
    Math.min((props.points() / max) * 100, 100)
  );

  return (
    <div class="w-full relative flex items-center h-6 bg-black">
      <div
        class={`absolute left-0 top-0 h-full opacity-30 transition-all duration-300 ${props.color}`}
        style={{ width: `${progress()}%` }}
      />
      <div class="absolute left-1 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
        {props.icon}
      </div>
      <div class="w-full flex justify-end items-center pr-1">
        {props.points()} <span class="pl-1 text-xs text-white/50">/ {max}</span>
      </div>
    </div>
  );
};

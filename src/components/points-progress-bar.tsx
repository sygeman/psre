import { Accessor, Component, createMemo } from 'solid-js';

type Props = {
  label: string;
  points: Accessor<number>;
  color: string;
  icon: string;
};

export const PointsProgressBar: Component<Props> = (props) => {
  const max = 120;
  const progress = createMemo(() =>
    Math.min((props.points() / max) * 100, 100)
  );

  return (
    <div class="relative flex h-6 w-full items-center bg-black">
      <div
        class={`absolute top-0 left-0 h-full opacity-30 transition-all duration-300 ${props.color}`}
        style={{ width: `${progress()}%` }}
      />
      <div class="absolute top-1/2 left-1 -translate-y-1/2 text-xs font-medium text-white">
        {props.icon}
      </div>
      <div class="flex w-full items-center justify-end pr-1">
        {props.points()} <span class="pl-1 text-xs text-white/50">/ {max}</span>
      </div>
    </div>
  );
};

import { Component } from 'solid-js';

type Props = {
  name: string;
  type: string;
  heroStyle: 'red' | 'green' | 'yellow' | 'purple' | 'blue';
  level: number;
  starLevel: number;
  upgradeLevel: number;
};

export const HeroCard: Component<Props> = (props) => {
  return (
    <div
      classList={{
        'aspect-2/3 relative': true,
        'bg-red-900': props.heroStyle === 'red',
        'bg-green-900': props.heroStyle === 'green',
        'bg-yellow-900': props.heroStyle === 'yellow',
        'bg-purple-900': props.heroStyle === 'purple',
        'bg-blue-900': props.heroStyle === 'blue',
      }}
    >
      <div class="bg-black/90 top-0 ml-0.5 w-[calc(100%-4px)] h-[calc(100%-28px)]" />
      <div class="absolute bottom-12 left-1.5 font-bold">
        +{props.upgradeLevel}
      </div>
      <div class="absolute bottom-12 right-1.5">Lv.{props.level}</div>
      <div class="absolute bottom-7 left-0 w-full flex justify-center">
        {props.starLevel}*
      </div>
      <div class="absolute bottom-0 flex items-center justify-center w-full">
        <span class="bg-black/60 flex mx-0.5 px-2 absolute left-0">
          {props.type}
        </span>
        <span class="text-sm py-1">{props.name}</span>
      </div>
    </div>
  );
};

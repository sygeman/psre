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
      <div class="top-0 ml-0.5 h-[calc(100%-28px)] w-[calc(100%-4px)] bg-black/90" />
      <div class="absolute bottom-12 left-1.5 font-bold">
        +{props.upgradeLevel}
      </div>
      <div class="absolute right-1.5 bottom-12">Lv.{props.level}</div>
      <div class="absolute bottom-7 left-0 flex w-full justify-center">
        {props.starLevel}*
      </div>
      <div class="absolute bottom-0 flex w-full items-center justify-center">
        <span class="absolute left-0 mx-0.5 flex bg-black/60 px-2">
          {props.type}
        </span>
        <span class="py-1 text-sm">{props.name}</span>
      </div>
    </div>
  );
};

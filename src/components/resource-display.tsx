import { Component } from 'solid-js';
import { RESOURCES } from '@/constants/resources';

type Props = {
  icon: string;
  value: number;
};

export const ResourceDisplay: Component<Props> = (props) => {
  return (
    <div class="flex items-center gap-1">
      <span>{props.icon || RESOURCES.DIAMOND.icon}</span>
      <span class="font-medium">{props.value}</span>
    </div>
  );
};

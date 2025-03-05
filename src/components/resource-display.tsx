import { Component } from 'solid-js';
import { RESOURCES } from '@/constants/resources';
import { AnimatedNumber } from './animated-number';

type Props = {
  icon: string;
  value: number;
};

export const ResourceDisplay: Component<Props> = (props) => {
  return (
    <div class="flex items-center gap-1">
      <span>{props.icon || RESOURCES.DIAMOND.icon}</span>
      <span class="font-medium"><AnimatedNumber value={props.value} compact={false}  /></span>
    </div>
  );
};

import { Component } from 'solid-js';

type Props = {
  icon: string;
  value: number;
};

export const ResourceDisplay: Component<Props> = (props) => {
  return (
    <div class="flex items-center gap-1 rounded bg-slate-900 px-2 py-1">
      <span>{props.icon}</span>
      <span>{props.value.toLocaleString('en-US')}</span>
    </div>
  );
};

import { JSX } from 'solid-js';
import { BackButton } from '../modules/back-button';

type BackLayoutProps = {
  children: JSX.Element;
  title: string;
  rightContent?: JSX.Element;
};

export function BackLayout(props: BackLayoutProps) {
  return (
    <div class="relative flex h-screen flex-col">
      <div class="relative flex h-14 shrink-0 items-center justify-center bg-slate-800 px-4">
        <div class="absolute left-0">
          <BackButton />
        </div>
        <div class="text-lg font-medium">{props.title}</div>
        {props.rightContent && (
          <div class="absolute right-0">{props.rightContent}</div>
        )}
      </div>
      {props.children}
    </div>
  );
}

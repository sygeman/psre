import { JSX } from 'solid-js';
import { BackButton } from '@/modules/back-button';
import { ToastNotifications } from '@/components/toast-notifications';

type BackLayoutProps = {
  children: JSX.Element;
  title: string;
  rightContent?: JSX.Element;
};

export function BackLayout(props: BackLayoutProps) {
  return (
    <div class="relative flex h-screen flex-col">
      <ToastNotifications />
      <div class="relative flex h-14 shrink-0 items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-b border-white/10">
        <BackButton />
        <div class="absolute left-1/2 -translate-x-1/2 text-lg font-medium">
          {props.title}
        </div>
        {props.rightContent && <div>{props.rightContent}</div>}
      </div>
      {props.children}
    </div>
  );
}

import { A, useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';
import { Icon } from 'solid-heroicons';
import { home, globeAlt, trophy, userCircle } from 'solid-heroicons/outline';

export const BottomMenu = () => {
  const location = useLocation();
  const isHome = createMemo(() => location.pathname === '/');

  return (
    <div class="grid h-16 w-full grid-cols-3 bg-slate-800">
      <A
        href={isHome() ? '/region' : '/'}
        class="flex flex-col items-center justify-center gap-1"
      >
        <Icon path={isHome() ? globeAlt : home} class="h-6 w-6" />
        <div class="text-xs">{isHome() ? 'Мир' : 'Домой'}</div>
      </A>
      <A href="/heroes" class="flex flex-col items-center justify-center gap-1">
        <Icon path={userCircle} class="h-6 w-6" />
        <div class="text-xs">Герои</div>
      </A>
      <A href="/rank" class="flex flex-col items-center justify-center gap-1">
        <Icon path={trophy} class="h-6 w-6" />
        <div class="text-xs">Ранги</div>
      </A>
    </div>
  );
};

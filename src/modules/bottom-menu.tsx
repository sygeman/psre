import { A, useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';

export const BottomMenu = () => {
  const location = useLocation();
  const home = createMemo(() => location.pathname === '/');

  return (
    <div class="grid h-16 w-full grid-cols-3 bg-slate-800">
      <A
        href={home() ? '/region' : '/'}
        class="flex items-center justify-center"
      >
        {home() ? 'Мир' : 'Домой'}
      </A>
      <A href="/heroes" class="flex items-center justify-center">
        Герои
      </A>
      <A href="/rank" class="flex items-center justify-center">
        Ранги
      </A>
    </div>
  );
};

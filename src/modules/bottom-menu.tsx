import { A, useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';

export const BottomMenu = () => {
  const location = useLocation();
  const home = createMemo(() => location.pathname === '/');

  return (
    <div class="h-16 grid grid-cols-2 w-full bg-slate-800">
      <A
        href={home() ? '/region' : '/'}
        class="flex justify-center items-center"
      >
        {home() ? 'Мир' : 'Домой'}
      </A>
      <A href="/heroes" class="flex justify-center items-center">
        Герои
      </A>
    </div>
  );
};

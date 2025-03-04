import { A, useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';
import { Icon } from 'solid-heroicons';
import {
  home,
  globeAlt,
  trophy,
  userCircle,
  clipboardDocumentList,
  userGroup,
  envelopeOpen,
} from 'solid-heroicons/outline';
import { mailStore } from '@/stores/mail';

export const BottomMenu = () => {
  const location = useLocation();
  const isHome = createMemo(() => location.pathname === '/');

  return (
    <div class="grid h-16 w-full grid-cols-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border-t border-white/10">
      <A
        href={isHome() ? '/region' : '/'}
        class="relative flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
      >
        <div class="absolute inset-0 bg-yellow-800/70" />
        <div class="relative flex flex-col items-center gap-1">
          <Icon
            path={isHome() ? globeAlt : home}
            class="h-6 w-6 text-yellow-100"
          />
          <div class="text-xs text-yellow-100">
            {isHome() ? 'Мир' : 'Домой'}
          </div>
        </div>
      </A>
      <A href="/quests" class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5">
        <Icon path={clipboardDocumentList} class="h-6 w-6 text-slate-400" />
        <div class="text-xs">Квесты</div>
      </A>
      <A href="/heroes" class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5">
        <Icon path={userCircle} class="h-6 w-6 text-slate-400" />
        <div class="text-xs">Герои</div>
      </A>
      <A href="/mail" class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5">
        <div class="relative">
          <Icon path={envelopeOpen} class="h-6 w-6 text-slate-400" />
          {mailStore.unreadCount > 0 && (
            <div class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {mailStore.unreadCount}
            </div>
          )}
        </div>
        <div class="text-xs">Почта</div>
      </A>
      <A
        href="/alliance"
        class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5"
      >
        <Icon path={userGroup} class="h-6 w-6 text-slate-400" />
        <div class="text-xs">Альянс</div>
      </A>
      <A href="/rank" class="flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/5">
        <Icon path={trophy} class="h-6 w-6 text-slate-400" />
        <div class="text-xs">Ранги</div>
      </A>
    </div>
  );
};

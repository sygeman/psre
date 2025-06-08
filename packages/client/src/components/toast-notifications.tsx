import { For } from 'solid-js';
import { notificationStore } from '@/stores/notifications';


export function ToastNotifications() {
  return (
    <div class="fixed left-0 right-0 top-48 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
      <For each={notificationStore.notifications}>
        {(notification) => {
          return (
            <div
              class="w-full text-center py-2 text-white shadow-xl bg-gradient-to-r from-slate-800/20 via-slate-800/40 to-slate-800/20 backdrop-blur-sm border-y border-white/10 animate-[slide-down_0.5s_ease-out]"
            >
              <div class="text-sm font-medium">{notification.message}</div>
            </div>
          );
        }}
      </For>
    </div>
  );
} 
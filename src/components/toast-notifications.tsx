import { For, onMount, onCleanup } from 'solid-js';
import { notificationStore, type Notification } from '@/stores/notifications';

const TEST_NOTIFICATIONS = [
  {
    type: 'info' as const,
    message: 'Вы получили 100 дерева',
  },
  {
    type: 'info' as const,
    message: 'Доступен новый квест',
  },
  {
    type: 'info' as const,
    message: 'Внимание! Вражеская активность',
  },
  {
    type: 'info' as const,
    message: 'Ошибка загрузки ресурсов',
  },
];

export function ToastNotifications() {
  let intervalId: number;

  onMount(() => {
    console.log('ToastNotifications mounted');
    // Отправляем тестовое уведомление каждые 5 секунд
    intervalId = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TEST_NOTIFICATIONS.length);
      const notification = TEST_NOTIFICATIONS[randomIndex];
      console.log('Sending notification:', notification);
      notificationStore.addNotification(notification);
    }, 5000);

    // Отправляем первое уведомление сразу
    const firstNotification = TEST_NOTIFICATIONS[0];
    console.log('Sending first notification:', firstNotification);
    notificationStore.addNotification(firstNotification);
  });

  onCleanup(() => {
    console.log('ToastNotifications cleanup');
    clearInterval(intervalId);
  });

  return (
    <div class="fixed left-0 right-0 top-48 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
      <For each={notificationStore.notifications}>
        {(notification) => {
          console.log('Rendering notification:', notification);
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
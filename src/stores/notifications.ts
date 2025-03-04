import { createStore } from 'solid-js/store';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: Date;
};

const [notificationState, setNotificationState] = createStore({
  notifications: [] as Notification[],
});

export const notificationStore = {
  get notifications() {
    console.log('Getting notifications:', notificationState.notifications);
    return notificationState.notifications;
  },

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>) {
    console.log('Adding notification:', notification);
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
    };

    setNotificationState('notifications', (notifications) => {
      const newNotifications = [newNotification, ...notifications];
      console.log('New notifications array:', newNotifications);
      return newNotifications;
    });

    // Автоматически удаляем уведомление через 3 секунды
    setTimeout(() => {
      console.log('Removing notification:', newNotification.id);
      setNotificationState('notifications', (notifications) =>
        notifications.filter((n) => n.id !== newNotification.id)
      );
    }, 3000);
  },
}; 
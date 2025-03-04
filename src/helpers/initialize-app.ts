import { directus } from '@/lib/directus';
import { GET_ACCOUNT } from '@/graphql/queries';
import { updateStateFromData } from '@/stores/state';
import { chatStore } from '@/stores/chat';
import { accountStateSubscription } from '@/subscriptions/account-state';
import { chatSubscription } from '@/subscriptions/chat';
import { TEST_NOTIFICATIONS } from '@/mocks/notification';
import { notificationStore } from '@/stores/notifications';

export const initializeApp = async () => {
  try {
    await directus.connect();

    // Будем получать на основе авторизации
    const accountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';

    const accountQuery = await directus.query(GET_ACCOUNT, {
      id: accountId,
    });

    const account = accountQuery?.psre_account_by_id;

    console.log(account);

    const state = account?.state[0];
    const stateId = state?.id;
    const regionChatId = account?.region_id?.chat_id?.id;
    const allianceChatId = account?.alliance_id?.chat_id?.id;

    chatStore.setChatIds(regionChatId, allianceChatId);
    chatStore.addMessagesToChannel('region', account.region_id.chat_id.messages)
    chatStore.addMessagesToChannel('alliance', account.alliance_id.chat_id.messages)
    
    updateStateFromData(state);
    accountStateSubscription(stateId);
    chatSubscription('region', regionChatId);
    chatSubscription('alliance', allianceChatId);

    // Отправляем тестовое уведомление каждые 5 секунд
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TEST_NOTIFICATIONS.length);
      const notification = TEST_NOTIFICATIONS[randomIndex];
      notificationStore.addNotification(notification);
    }, 5000);

    // Отправляем первое уведомление сразу
    const firstNotification = TEST_NOTIFICATIONS[0];
    notificationStore.addNotification(firstNotification);

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать приложение:', error);
    return false;
  }
};

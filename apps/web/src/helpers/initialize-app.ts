import { directus } from '@/lib/directus';
import { GET_ACCOUNT } from '@/graphql/queries';
import { updateStateFromData } from '@/stores/state';
import { chatStore } from '@/stores/chat';
import { accountStateSubscription } from '@/subscriptions/account-state';
import { chatSubscription } from '@/subscriptions/chat';
import { initAllianceHelp } from '@/stores/alliance';
import { websocketStore } from '@/stores/websocket';
import { authStore } from '@/stores/auth';

export const sendWebSocketMessage = (message: any) => {
  return websocketStore.sendMessage(message);
};

export const initializeApp = async () => {
  authStore.initAuthStore();
  
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

    // Инициализация увеличения помощи альянса
    initAllianceHelp();

    // WebSocket будет автоматически подключаться при авторизации через authStore/websocketStore
    console.log('✅ App initialized successfully');
    console.log('🔗 WebSocket connection will be managed by auth system');

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать приложение:', error);
    return false;
  }
};

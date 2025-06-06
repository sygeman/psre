import { directus } from '@/lib/directus';
import { GET_ACCOUNT } from '@/graphql/queries';
import { updateStateFromData } from '@/stores/state';
import { chatStore } from '@/stores/chat';
import { accountStateSubscription } from '@/subscriptions/account-state';
import { chatSubscription } from '@/subscriptions/chat';
import { initAllianceHelp } from '@/stores/alliance';
import { websocketStore } from '@/stores/websocket';
import { authService } from '@/modules/auth/auth.service';
import { createEffect } from 'solid-js';

export const initializeApp = async () => {
  setTimeout(() => {
    if (websocketStore.isConnected) {
      websocketStore.sendMessage({
        type: 'subscribe',
        payload: {
          name: 'state',
        },
      })
    }
  }, 5000);

  try {
    websocketStore.connect();

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

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать приложение:', error);
    return false;
  }
};

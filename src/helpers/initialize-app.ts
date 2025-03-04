import { directus } from '@/lib/directus';
import { GET_ACCOUNT } from '@/graphql/queries';
import { updateStateFromData } from '@/stores/state';
import { chatStore } from '@/stores/chat';
import { connectionStore } from '@/stores/connection';

const collection = 'psre_account_state';

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

    updateStateFromData(state);

    const { subscription } = await directus.subscribe(collection, {
      query: { filter: { id: { _eq: stateId } } },
      event: 'update',
      uid: 'update-account-state',
    });

    (async () => {
      try {
        for await (const item of subscription) {
          if (
            item.event === 'update' &&
            Array.isArray(item.data) &&
            item.data.length > 0
          ) {
            updateStateFromData(item.data[0]);
          }
        }
      } catch (subscriptionError) {
        console.error('Ошибка при обработке обновлений:', subscriptionError);
      }
    })();

    chatStore.initializeMockMessages();
    connectionStore.initialize();

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать приложение:', error);
    return false;
  }
};

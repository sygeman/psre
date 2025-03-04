import { directus } from '@/lib/directus';
import { GET_ACCOUNT_STATE } from '@/graphql/queries';
import { updateStateFromData } from './state';
import { chatStore } from './chat';
import { connectionStore } from './connection';

const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';
const collection = 'psre_account_state';

export const initializeStore = async () => {
  try {
    const data = await directus.query(GET_ACCOUNT_STATE, {
      id: stateId,
    });

    updateStateFromData(data.psre_account_state_by_id);

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

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать хранилище:', error);
    return false;
  }
};

export const initializeAllStores = async () => {
  await directus.connect();
  await initializeStore();
  chatStore.initializeMockMessages();
  connectionStore.initialize();
};

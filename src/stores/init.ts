import { directus } from '@/lib/directus';
import { GET_ACCOUNT_STATE } from '@/graphql/queries';
import { setAccountState } from './state';
import { chatStore } from './chat';
import { connectionStore } from './connection';

type AccountStateData = {
  level?: number;
  action_points?: number;
  stamina_points?: number;
  food?: number | string;
  wood?: number | string;
  steel?: number | string;
  fuel?: number | string;
  diamond?: number | string;
  power?: number | string;
  serum?: number | string;
  exp?: number | string;
};

const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';
const collection = 'psre_account_state';

const updateStateFromData = (data: AccountStateData) => {
  if (!data) return;

  setAccountState({
    level: data.level ?? 0,
    action_points: data.action_points ?? 0,
    stamina_points: data.stamina_points ?? 0,
    food: Number(data.food ?? 0),
    wood: Number(data.wood ?? 0),
    steel: Number(data.steel ?? 0),
    fuel: Number(data.fuel ?? 0),
    diamond: Number(data.diamond ?? 0),
    power: Number(data.power ?? 0),
    serum: Number(data.serum ?? 0),
    exp: Number(data.exp ?? 0),
  });
};

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

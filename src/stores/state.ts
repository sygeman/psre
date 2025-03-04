import { createStore } from 'solid-js/store';
import { directus } from '../lib/directus';
import { createSignal } from 'solid-js';
import { GET_ACCOUNT_STATE } from '../graphql/queries';

type AccountState = {
  level: number;
  action_points: number;
  stamina_points: number;
  food: number;
  wood: number;
  steel: number;
  fuel: number;
  diamond: number;
  power: number;
  serum: number;
  exp: number;
};

// psre_account
// ba12e291-2e9c-452e-ae06-81c1a885390e

const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';
const collection = 'psre_account_state';

export const [accountState, setAccountState] = createStore<AccountState>({
  level: 0,
  action_points: 0,
  stamina_points: 0,
  food: 0,
  wood: 0,
  steel: 0,
  fuel: 0,
  diamond: 0,
  power: 0,
  serum: 0,
  exp: 0,
});

const updateStateFromData = (data: any) => {
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

    const { subscription, unsubscribe } = await directus.subscribe(collection, {
      query: { filter: { id: { _eq: stateId } } },
      event: 'update',
      uid: 'update-account-state',
    });

    setUnsubscribeFunction(() => unsubscribe);

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

// Функция для хранения и использования функции отписки
const [unsubscribeFunction, setUnsubscribeFunction] = createSignal<
  (() => void) | null
>(null);

// Функция для отписки от обновлений при необходимости (например, при размонтировании компонента)
export const unsubscribeFromUpdates = () => {
  const unsubscribe = unsubscribeFunction();
  if (typeof unsubscribe === 'function') {
    unsubscribe();
    setUnsubscribeFunction(null);
    return true;
  }
  return false;
};

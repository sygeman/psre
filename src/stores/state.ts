import { createStore } from "solid-js/store";
import { directus } from "../lib/directus";
import { readItem } from "@directus/sdk";

type AccountState = {
    level: number;
    action_points: number;
    stamina_points: number;
    food: number,
    wood: number,
    steel: number,
    fuel: number,
    diamond: number,
    power: number;
    serum: number;
}


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
    serum: 0
});

const updateStateFromData = (data) => {
    setAccountState({
        level: data?.level,
        action_points: data?.action_points,
        stamina_points: data?.stamina_points,
        food: data?.food,
        wood: data?.wood,
        steel: data?.steel,
        fuel: data?.fuel,
        diamond: data?.diamond,
        power: data?.power,
        serum: data?.serum
    })
}

export const initializeStore = async () => {
    const data = await directus.request(readItem(collection, stateId));

    updateStateFromData(data)

    const subData = await directus.subscribe(collection, {
        query: { filter: { id: { _eq: stateId } } },
        event: 'update',
        uid: 'update-account-state'
    });    

    for await (const item of subData.subscription) {
        if (item.event === 'update') {
            updateStateFromData(item.data[0])
        }
      }
}
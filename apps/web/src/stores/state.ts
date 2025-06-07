import { createStore } from 'solid-js/store';

export type AccountState = {
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
  materials: number;
};

export type AccountStateData = {
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
  materials?: number | string;
};

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
  materials: 0,
});

export const updateStateFromData = (data: AccountStateData) => {
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
    materials: Number(data.materials ?? 0),
  });
};

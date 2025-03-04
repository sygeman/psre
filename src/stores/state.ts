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
});

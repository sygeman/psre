import { accountState } from "../stores/state";

const formatter = new Intl.NumberFormat('en', { 
  notation: 'compact', 
  compactDisplay: 'short'
});

export const ResourcesPanel = () => {
  return (
    <div class="grid px-4 w-full h-8 grid-cols-5">
      <div class="flex items-center">F {formatter.format(accountState.food)}</div>
      <div class="flex items-center">W {formatter.format(accountState.wood)}</div>
      <div class="flex items-center">S {formatter.format(accountState.steel)}</div>
      <div class="flex items-center">F {formatter.format(accountState.fuel)}</div>
      <div class="flex items-center">D {formatter.format(accountState.diamond)}</div>
    </div>
  );
};

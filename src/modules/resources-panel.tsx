import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';
import { RESOURCES } from '@/constants/resources';

const formatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const ResourcesPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="grid h-8 w-full grid-cols-5 px-4 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div class="flex items-center gap-1 text-gray-200">
        {RESOURCES.FOOD.icon} {formatter.format(accountState.food)}
      </div>
      <div class="flex items-center gap-1 text-gray-200">
        {RESOURCES.WOOD.icon} {formatter.format(accountState.wood)}
      </div>
      <div class="flex items-center gap-1 text-gray-200">
        {RESOURCES.STEEL.icon} {formatter.format(accountState.steel)}
      </div>
      <div class="flex items-center gap-1 text-gray-200">
        {RESOURCES.FUEL.icon} {formatter.format(accountState.fuel)}
      </div>
      <div
        class="flex cursor-pointer items-center gap-1 transition-colors hover:text-yellow-400"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.DIAMOND.icon} {formatter.format(accountState.diamond)}{' '}
        <span class="inline-flex items-center font-bold text-yellow-400">+</span>
      </div>
    </div>
  );
};

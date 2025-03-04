import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';

const formatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const ResourcesPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="grid h-8 w-full grid-cols-5 px-4">
      <div class="flex items-center gap-1">
        🌾 {formatter.format(accountState.food)}
      </div>
      <div class="flex items-center gap-1">
        🪵 {formatter.format(accountState.wood)}
      </div>
      <div class="flex items-center gap-1">
        🔩 {formatter.format(accountState.steel)}
      </div>
      <div class="flex items-center gap-1">
        🛢️ {formatter.format(accountState.fuel)}
      </div>
      <div
        class="flex cursor-pointer items-center gap-1 transition-colors hover:text-yellow-400"
        onClick={() => navigate('/shop')}
      >
        💎 {formatter.format(accountState.diamond)}{' '}
        <span class="inline-flex items-center font-bold text-yellow-400">
          +
        </span>
      </div>
    </div>
  );
};

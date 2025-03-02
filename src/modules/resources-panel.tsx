import { accountState } from '../stores/state';
import { useNavigate } from '@solidjs/router';

const formatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const ResourcesPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="grid px-4 w-full h-8 grid-cols-5">
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
        class="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-colors"
        onClick={() => navigate('/shop')}
      >
        💎 {formatter.format(accountState.diamond)}
      </div>
    </div>
  );
};

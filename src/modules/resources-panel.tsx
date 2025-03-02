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
      <div class="flex items-center">
        F {formatter.format(accountState.food)}
      </div>
      <div class="flex items-center">
        W {formatter.format(accountState.wood)}
      </div>
      <div class="flex items-center">
        S {formatter.format(accountState.steel)}
      </div>
      <div class="flex items-center">
        F {formatter.format(accountState.fuel)}
      </div>
      <div 
        class="flex items-center cursor-pointer hover:text-yellow-400 transition-colors"
        onClick={() => navigate('/shop')}
      >
        💎 {formatter.format(accountState.diamond)}
      </div>
    </div>
  );
};

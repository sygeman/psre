import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';
import { RESOURCES } from '@/constants/resources';
import { AnimatedNumber } from '@/components/animated-number';

const formatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
});

export const ResourcesPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="grid h-8 w-full grid-cols-5 px-4 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div 
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.FOOD.icon} <AnimatedNumber value={accountState.food} />
      </div>
      <div 
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.WOOD.icon} <AnimatedNumber value={accountState.wood} />
      </div>
      <div 
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.STEEL.icon} <AnimatedNumber value={accountState.steel} />
      </div>
      <div 
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.FUEL.icon} <AnimatedNumber value={accountState.fuel} />
      </div>
      <div 
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100"
        onClick={() => navigate('/shop')}
      >
        {RESOURCES.DIAMOND.icon} <AnimatedNumber value={accountState.diamond} />
        <span class="inline-flex items-center font-bold text-yellow-400">+</span>
      </div>
    </div>
  );
};

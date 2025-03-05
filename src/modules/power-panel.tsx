import { AnimatedNumber } from '@/components/animated-number';
import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';

export const PowerPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="text flex h-8 items-center overflow-hidden">
      <span
        class="relative flex h-full cursor-pointer items-center bg-gradient-to-r from-yellow-800/80 to-yellow-700/80 px-3 hover:from-yellow-700/80 hover:to-yellow-600/80 transition-colors backdrop-blur-sm group"
        onClick={() => navigate('/vip')}
      >
        {/* Градиентные эффекты */}
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
        
        {/* Анимированное свечение при наведении */}
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Светящиеся частицы */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute w-8 h-8 -left-4 -top-4 bg-yellow-400/20 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
          <div class="absolute w-8 h-8 -right-4 -bottom-4 bg-yellow-400/20 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
        </div>
        
        <span class="relative z-10 font-medium text-yellow-100 drop-shadow-glow">VIP 1</span>
      </span>
      <span class="relative flex h-full items-center gap-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-3 backdrop-blur-sm">
        {/* Градиентные эффекты */}
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
        
        {/* Светящиеся частицы */}
        <div class="absolute inset-0 opacity-20">
          <div class="absolute w-8 h-8 -left-4 -top-4 bg-white/10 rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite]" />
          <div class="absolute w-8 h-8 -right-4 -bottom-4 bg-white/10 rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
        </div>
        
        <span class="relative z-10 font-medium text-slate-200">
          💪
        </span>
        <span class="relative z-10 font-medium text-slate-200">
          <AnimatedNumber value={accountState.power} compact={false} />
        </span>
      </span>
    </div>
  );
};

import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';

export const PowerPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="text flex h-8 items-center overflow-hidden">
      <span
        class="relative flex h-full cursor-pointer items-center bg-yellow-700/80 px-2 hover:bg-yellow-600/80 backdrop-blur-sm group"
        onClick={() => navigate('/vip')}
      >
        {/* Градиентная обводка */}
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
        
        {/* Анимированное свечение при наведении */}
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <span class="relative z-10">VIP 1</span>
      </span>
      <span class="relative flex h-full items-center gap-1 bg-slate-700/80 px-2 backdrop-blur-sm">
        {/* Градиентная обводка */}
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
        
        <span class="relative z-10">
          💪 {Number(accountState.power).toLocaleString('en-US')}
        </span>
      </span>
    </div>
  );
};

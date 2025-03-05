import { PointsProgressBar } from '@/components/points-progress-bar';
import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';
import { CharacterAvatar } from '@/components/character-avatar';

export const PersonPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="w-24 bg-slate-800/80 text-sm backdrop-blur-sm">
      <div
        class="relative flex size-24 cursor-pointer bg-slate-700/80 transition-colors hover:bg-slate-600/80 overflow-hidden"
        onClick={() => navigate('/person')}
      >
        {/* Градиентная обводка */}
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
        
        <CharacterAvatar class="size-24 relative z-10" />
        <div class="absolute top-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 z-20 backdrop-blur-sm border border-white/10 text-yellow-100 font-medium shadow-lg text-xs">
          {accountState.level}
        </div>
      </div>

      <PointsProgressBar
        points={() => accountState.stamina_points}
        label="SP"
        icon="🔋"
        color="bg-orange-500"
      />
      <PointsProgressBar
        points={() => accountState.action_points}
        label="AP"
        icon="⚡"
        color="bg-blue-500"
      />
    </div>
  );
};

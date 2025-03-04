import { PointsProgressBar } from '@/components/points-progress-bar';
import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';
import { CharacterAvatar } from '@/components/character-avatar';

export const PersonPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="w-24 bg-slate-800 text-sm">
      <div
        class="relative flex size-24 cursor-pointer bg-slate-700 transition-colors hover:bg-slate-600"
        onClick={() => navigate('/person')}
      >
        <CharacterAvatar class="size-24" />
        <div class="absolute top-1 left-1 rounded bg-black px-1">
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

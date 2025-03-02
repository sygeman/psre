import { PointsProgressBar } from '../components/points-progress-bar';
import { accountState } from '../stores/state';

export const PersonPanel = () => {
  return (
    <div class="text-sm bg-slate-800 w-24">
      <div class="flex size-24 bg-slate-700 relative">
        <div class="absolute left-1 top-1 bg-black px-1 rounded">
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

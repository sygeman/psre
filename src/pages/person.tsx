import { BackButton } from '../modules/back-button';
import { PointsProgressBar } from '../components/points-progress-bar';
import { accountState } from '../stores/state';

export function PersonPage() {
  return (
    <div class="relative flex flex-col h-screen">
      <div class="h-12 flex bg-slate-800 justify-center items-center relative">
        <div class="left-0 absolute">
          <BackButton />
        </div>
        <div class="text-lg">Персонаж</div>
      </div>

      <div class="p-4 flex flex-col gap-4">
        {/* Аватар и уровень */}
        <div class="flex size-32 bg-slate-700 relative">
          <div class="absolute left-2 top-2 bg-black px-2 py-1 rounded text-lg">
            {accountState.level}
          </div>
        </div>

        {/* Характеристики */}
        <div class="flex flex-col gap-2">
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

        {/* Мощь */}
        <div class="flex items-center gap-2 text-lg">
          <span>💪</span>
          <span>{Number(accountState.power).toLocaleString('en-US')}</span>
        </div>

        {/* Ресурсы */}
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-2">
            <span>🌾</span>
            <span>{Number(accountState.food).toLocaleString('en-US')}</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🪵</span>
            <span>{Number(accountState.wood).toLocaleString('en-US')}</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🔩</span>
            <span>{Number(accountState.steel).toLocaleString('en-US')}</span>
          </div>
          <div class="flex items-center gap-2">
            <span>🛢️</span>
            <span>{Number(accountState.fuel).toLocaleString('en-US')}</span>
          </div>
          <div class="flex items-center gap-2">
            <span>💎</span>
            <span>{Number(accountState.diamond).toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
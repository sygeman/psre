import { GameLayout } from '@/layouts/game-layout';

export function HomePage() {
  return <GameLayout>
    <div class='size-30 border border-slate-400 rounded justify-center items-center flex cursor-pointer'>
      <div class='text-center'>
        <div class=''>Лаборатория</div>
        <div class='text-slate-300 text-xs'>Нажми чтобы собрать вакцину</div>
      </div>
    </div>
  </GameLayout>;
}

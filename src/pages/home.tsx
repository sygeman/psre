import { GameLayout } from '@/layouts/game-layout';
import { beaker } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';
import { accountState } from '@/stores/state';

export function HomePage() {
  const collectSerum = () => {
    // TODO: Добавить логику сбора вакцины
    console.log('Собираем вакцину');
  };

  return <GameLayout>
    <div class="relative w-40 h-48 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-400 transition-colors group overflow-visible mt-6">
      {/* Уровень здания */}
      <div class="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full border-2 border-slate-600 flex items-center justify-center text-sm font-medium z-10">
        {accountState.level}
      </div>

      {/* Крыша с кнопкой */}
      <div class="absolute top-0 left-0 right-0 h-12 bg-slate-700 rounded-t-lg">
        <div class="absolute -top-[84px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-slate-900/90 px-2 py-1 rounded text-slate-300">
          Нажми чтобы собрать вакцину
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900/90" />
        </div>
        <div class="absolute -top-[52px] left-1/2 -translate-x-1/2 animate-shake">
          <button 
            onClick={collectSerum}
            class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <Icon path={beaker} class="w-7 h-7 text-blue-400 group-hover:text-white" />
          </button>
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900" />
        </div>
      </div>
      
      {/* Окна */}
      <div class="absolute top-16 left-0 right-0 flex justify-center space-x-4 px-2">
        <div class="w-8 h-12 bg-blue-400/20 rounded-sm group-hover:bg-blue-400/30 transition-colors" />
        <div class="w-8 h-12 bg-blue-400/20 rounded-sm group-hover:bg-blue-400/30 transition-colors" />
        <div class="w-8 h-12 bg-blue-400/20 rounded-sm group-hover:bg-blue-400/30 transition-colors" />
      </div>

      {/* Дверь */}
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 bg-slate-700 rounded-t-lg" />

      {/* Текст */}
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <div class="text-center">
          <div class="font-medium">Лаборатория</div>
        </div>
      </div>

      {/* Эффект свечения при наведении */}
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div class="absolute inset-0 bg-blue-400/5" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-400/10 rounded-full blur-xl" />
      </div>
    </div>
  </GameLayout>;
}

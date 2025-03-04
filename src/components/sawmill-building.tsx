import { Icon } from 'solid-heroicons';
import { wrench } from 'solid-heroicons/solid';
import { accountState } from '@/stores/state';

type SawmillBuildingProps = {
  onCollect: () => void;
};

export function SawmillBuilding(props: SawmillBuildingProps) {
  return (
    <div class="relative w-40 h-48 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-400 transition-colors group overflow-visible mt-6">
      {/* Уровень здания */}
      <div class="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full border-2 border-slate-600 flex items-center justify-center text-sm font-medium z-10">
        {accountState.level}
      </div>

      {/* Крыша с кнопкой */}
      <div class="absolute top-0 left-0 right-0 h-16 bg-orange-900 rounded-t-lg">
        <div class="absolute -top-[84px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-slate-900/90 px-2 py-1 rounded text-slate-300">
          Нажми чтобы собрать древесину
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900/90" />
        </div>
        <div class="absolute -top-[52px] left-1/2 -translate-x-1/2 animate-shake">
          <button 
            onClick={props.onCollect}
            class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <Icon path={wrench} class="w-7 h-7 text-orange-400 group-hover:text-white" />
          </button>
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900" />
        </div>
      </div>
      
      {/* Бревна */}
      <div class="absolute top-20 left-0 right-0 flex justify-center space-x-1 px-2">
        <div class="w-6 h-8 bg-orange-800 rounded-full" />
        <div class="w-6 h-8 bg-orange-800 rounded-full" />
        <div class="w-6 h-8 bg-orange-800 rounded-full" />
        <div class="w-6 h-8 bg-orange-800 rounded-full" />
      </div>

      {/* Пила */}
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-3 bg-slate-400 rounded group-hover:animate-pulse" />

      {/* Основание */}
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-orange-900 rounded-b-lg" />

      {/* Текст */}
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <div class="text-center">
          <div class="font-medium">Лесопилка</div>
        </div>
      </div>

      {/* Эффект свечения при наведении */}
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div class="absolute inset-0 bg-orange-400/5" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-400/10 rounded-full blur-xl" />
      </div>
    </div>
  );
}
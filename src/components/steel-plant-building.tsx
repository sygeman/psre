import { Icon } from 'solid-heroicons';
import { wrench } from 'solid-heroicons/solid';
import { accountState } from '@/stores/state';

type SteelPlantBuildingProps = {
  onCollect: () => void;
};

export function SteelPlantBuilding(props: SteelPlantBuildingProps) {
  return (
    <div class="relative w-40 h-48 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-400 transition-colors group overflow-visible mt-6">
      {/* Уровень здания */}
      <div class="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full border-2 border-slate-600 flex items-center justify-center text-sm font-medium z-10">
        {accountState.level}
      </div>

      {/* Крыша с кнопкой */}
      <div class="absolute top-0 left-0 right-0 h-16 bg-red-900 rounded-t-lg">
        <div class="absolute -top-[84px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-slate-900/90 px-2 py-1 rounded text-slate-300">
          Нажми чтобы собрать сталь
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900/90" />
        </div>
        <div class="absolute -top-[52px] left-1/2 -translate-x-1/2 animate-shake">
          <button 
            onClick={props.onCollect}
            class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <Icon path={wrench} class="w-7 h-7 text-red-400 group-hover:text-white" />
          </button>
          <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900" />
        </div>
      </div>
      
      {/* Трубы */}
      <div class="absolute top-6 left-0 right-0 flex justify-center space-x-2 px-2">
        <div class="w-4 h-20 bg-red-800 rounded-t-lg" />
        <div class="w-4 h-24 bg-red-800 rounded-t-lg" />
        <div class="w-4 h-16 bg-red-800 rounded-t-lg" />
      </div>

      {/* Основание */}
      <div class="absolute bottom-0 left-0 right-0 h-12 bg-red-900 rounded-b-lg" />

      {/* Текст */}
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <div class="text-center">
          <div class="font-medium">Сталелитейный завод</div>
        </div>
      </div>

      {/* Эффект свечения при наведении */}
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div class="absolute inset-0 bg-red-400/5" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-400/10 rounded-full blur-xl" />
      </div>
    </div>
  );
}
import { createSignal, onCleanup, For } from "solid-js";
import { Icon } from 'solid-heroicons';
import { 
  beaker, // для лаборатории
  buildingStorefront, // для лесопилки
  fire, // для заправки
  wrenchScrewdriver, // для сталелитейного
  buildingOffice2, // для фермы
} from 'solid-heroicons/solid';
import { accountState } from '@/stores/state';

type Building = {
  color: string;
  name: string;
  resourceName: string;
  level: number;
  collectionTime: number;
  icon: string;
  initialProgress?: number; // Добавляем новое опциональное свойство
  onLevelUp: () => void;
}

function BuildingCard(props: Building) {
  const [progress, setProgress] = createSignal(props.initialProgress || 0);
  const [timeLeft, setTimeLeft] = createSignal(
    props.initialProgress === 100 ? 0 : props.collectionTime
  );

  const timer = setInterval(() => {
    const newProgress = Math.min(progress() + (100 / props.collectionTime), 100);
    setProgress(newProgress);
    setTimeLeft(Math.max(0, props.collectionTime - (props.collectionTime * (newProgress / 100))));
  }, 1000);

  onCleanup(() => clearInterval(timer));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCollect = () => {
    if (progress() === 100) {
      setProgress(0);
      // Здесь будет логика начисления ресурсов
    }
  };

  return (
    <div class="w-full h-32 select-none flex-shrink-0">
      <div class={`relative h-full ${props.color} rounded-lg border border-white/10`}>
        {/* Название и уровень */}
        <div class="h-8 flex items-center justify-between px-3 text-white/80 text-sm font-medium border-b border-white/10">
          <span>{props.name}</span>
          
          {/* Уровень */}
          <span 
            class={`px-2 py-0.5 rounded text-xs ${props.color.replace('bg-', 'bg-').replace('-900', '-800')} ring-1 ring-white/20`}
          >
            Ур. {props.level}
          </span>
        </div>

        {/* Кнопки сбора и повышения уровня */}
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-6">
          <div class="relative">
            {/* Таймер или подсказка над кнопкой */}
            <div class="absolute -top-8 left-1/2 -translate-x-1/2">
              <div class="relative text-xs text-white/60 bg-black/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                {progress() === 100 
                  ? `Нажми чтобы собрать ${props.resourceName}`
                  : formatTime(timeLeft())
                }
                <div class="absolute left-1/2 -translate-x-1/2 top-[100%] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-black/20" />
              </div>
            </div>
            
            {/* Круговой прогресс */}
            <svg class="absolute -top-1 -left-1 w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke-width="2"
                fill="none"
                class="stroke-white/10"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke-width="2"
                fill="none"
                stroke-dasharray="163.36"
                stroke-dashoffset={163.36 - (163.36 * progress()) / 100}
                class="stroke-white/30 transition-all duration-300"
              />
            </svg>
            
            <button 
              onClick={handleCollect}
              disabled={progress() < 100}
              class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center transition-all focus:outline-none"
              classList={{
                'opacity-50 cursor-default': progress() < 100,
                'cursor-pointer': progress() === 100
              }}
            >
              {/* Внешнее свечение */}
              <div 
                class="absolute -inset-3 rounded-full blur-md transition-opacity"
                classList={{
                  'animate-pulse bg-white/20': progress() === 100,
                  'opacity-0': progress() < 100
                }}
              />
              
              <span 
                class={`relative flex items-center justify-center w-8 h-8 rounded-full ${props.color} transition-colors`}
              >
                {props.icon}
              </span>
            </button>
          </div>

          {/* Кнопка повышения уровня */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onLevelUp();
            }}
            disabled={true}
            class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center transition-all focus:outline-none opacity-50 cursor-default"
          >
            {/* Внешнее свечение */}
            <div 
              class="absolute -inset-3 rounded-full blur-md bg-white/10 opacity-0"
            />
            
            <span 
              class={`relative flex items-center justify-center w-8 h-8 rounded-full ${props.color} text-sm font-bold`}
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const Map = () => {
  const buildings: Building[] = [
    { 
      color: 'bg-blue-900', 
      name: 'Лаборатория', 
      resourceName: 'вакцина', 
      level: 1, 
      collectionTime: 300,
      icon: '🧪',
      onLevelUp: () => {
        // Логика повышения уровня для лаборатории
        console.log('Повышение уровня лаборатории');
      }
    },
    { 
      color: 'bg-orange-900', 
      name: 'Лесопилка', 
      resourceName: 'древесина', 
      level: 1, 
      collectionTime: 180,
      icon: '🪵',
      onLevelUp: () => {
        // Логика повышения уровня для лесопилки
        console.log('Повышение уровня лесопилки');
      }
    },
    { 
      color: 'bg-green-900', 
      name: 'Ферма', 
      resourceName: 'еда', 
      level: 1, 
      collectionTime: 120,
      icon: '🌾',
      initialProgress: 100, // Ферма готова к сбору
      onLevelUp: () => {
        // Логика повышения уровня для фермы
        console.log('Повышение уровня фермы');
      }
    },
    { 
      color: 'bg-purple-900', 
      name: 'Заправка', 
      resourceName: 'топливо', 
      level: 1, 
      collectionTime: 240,
      icon: '🛢️',
      onLevelUp: () => {
        // Логика повышения уровня для заправки
        console.log('Повышение уровня заправки');
      }
    },
    { 
      color: 'bg-red-900', 
      name: 'Сталелитейный завод', // исправлено название
      resourceName: 'сталь', 
      level: 1, 
      collectionTime: 360,
      icon: '🔩',
      onLevelUp: () => {
        // Логика повышения уровня для сталелитейного
        console.log('Повышение уровня сталелитейного завода');
      }
    },
  ];

  return (
    <div 
      class="h-full w-full"
      style={{
        "background-image": `
          linear-gradient(to bottom right, rgb(17 24 39), rgb(31 41 55), rgb(17 24 39)),
          url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23374151' fill-opacity='0.4'/%3E%3C/svg%3E")
        `,
        "background-repeat": "repeat",
      }}
    >
      <div class="scrollbar flex flex-col gap-3 overflow-y-auto h-full py-48 px-4">
        <For each={buildings}>{building => (
          <BuildingCard {...building} />
        )}</For>
      </div>
    </div>
  );
};

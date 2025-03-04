import { createSignal, onCleanup, For } from "solid-js";

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
      setTimeLeft(props.collectionTime);
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
            class="flex items-center justify-center w-6 h-6 rounded-md text-xs bg-black/30"
          >
            {props.level}
          </span>
        </div>

        {/* Кнопки сбора и повышения уровня */}
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-6">
          {/* Кнопка сбора ресурса */}
          <div class="relative flex flex-col items-center w-12">
            <div class="relative w-12 h-12">
              {/* Кнопка */}
              <button 
                onClick={handleCollect}
                disabled={progress() < 100}
                class={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                  progress() === 100 
                    ? `animate-[pulse_2s_ease-in-out_infinite] ${props.color.replace('-900', '-700')} cursor-pointer`
                    : 'bg-slate-900 cursor-not-allowed'
                }`}
              >
                <span 
                  class={`flex items-center justify-center w-8 h-8 rounded-full ${props.color}`}
                >
                  {props.icon}
                </span>
                
                {progress() < 100 && (
                  <div class="absolute inset-0 flex items-center justify-center text-xs text-white/60 bg-black/50 rounded-full">
                    {formatTime(timeLeft())}
                  </div>
                )}
              </button>
            </div>
            <span class="mt-1 text-xs text-white/60">{props.resourceName}</span>
          </div>

          {/* Кнопка повышения уровня */}
          <div class="flex flex-col items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.onLevelUp();
              }}
              disabled={true}
              class="relative w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center transition-all focus:outline-none opacity-50 cursor-default"
            >              
              <span 
                class={`relative flex items-center justify-center w-8 h-8 rounded-full ${props.color} text-sm font-bold`}
              >
                ↑
              </span>
            </button>
            <span class="mt-1 text-xs text-white/60">Улучшить</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Map = () => {
  const buildings: Building[] = [
    { 
      color: 'bg-cyan-900',
      name: 'Лаборатория', 
      resourceName: 'Вакцина', // Заглавная
      level: 1, 
      collectionTime: 300,
      icon: '🧪',
      onLevelUp: () => {
        console.log('Повышение уровня лаборатории');
      }
    },
    { 
      color: 'bg-emerald-900',
      name: 'Лесопилка', 
      resourceName: 'Древесина', // Заглавная
      level: 1, 
      collectionTime: 180,
      icon: '🪵',
      onLevelUp: () => {
        console.log('Повышение уровня лесопилки');
      }
    },
    { 
      color: 'bg-yellow-900',
      name: 'Ферма', 
      resourceName: 'Еда', // Заглавная
      level: 1, 
      collectionTime: 120,
      icon: '🌾',
      initialProgress: 100,
      onLevelUp: () => {
        console.log('Повышение уровня фермы');
      }
    },
    { 
      color: 'bg-orange-900',
      name: 'Заправка', 
      resourceName: 'Топливо', // Заглавная
      level: 1, 
      collectionTime: 240,
      icon: '🛢️',
      onLevelUp: () => {
        console.log('Повышение уровня заправки');
      }
    },
    { 
      color: 'bg-slate-700',
      name: 'Плавильня', 
      resourceName: 'Сталь', // Заглавная
      level: 1, 
      collectionTime: 360,
      icon: '🔩',
      onLevelUp: () => {
        console.log('Повышение уровня плавильни');
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
      <div class="scrollbar grid grid-cols-2 gap-3 overflow-y-auto h-full py-48 px-4">
        <For each={buildings}>{building => (
          <BuildingCard {...building} />
        )}</For>
      </div>
    </div>
  );
};

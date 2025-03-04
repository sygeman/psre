import { BuildingButton } from "@/components/building-button";
import { createSignal, onCleanup, For } from "solid-js";

type Building = {
  color: string;
  name: string;
  resourceName: string;
  level: number;
  collectionTime: number;
  upgradeDuration: number;
  icon: string;
  initialProgress?: number;
  initialUpgradeProgress?: number;
  onLevelUp: () => void;
}

function BuildingCard(props: Building) {  
  const [progress, setProgress] = createSignal(props.initialProgress || 0);
  const [timeLeft, setTimeLeft] = createSignal(
    props.initialProgress === 100 ? 0 : props.collectionTime
  );
  
  const [upgradeProgress, setUpgradeProgress] = createSignal(props.initialUpgradeProgress || 0);
  const [upgradeTimeLeft, setUpgradeTimeLeft] = createSignal(
    props.initialUpgradeProgress === 100 ? 0 : props.upgradeDuration
  );

  // Таймер для сбора ресурсов
  const resourceTimer = setInterval(() => {
    const newProgress = Math.min(progress() + (100 / props.collectionTime), 100);
    setProgress(newProgress);
    setTimeLeft(Math.max(0, props.collectionTime - (props.collectionTime * (newProgress / 100))));
  }, 1000);

  // Таймер для улучшения
  const upgradeTimer = setInterval(() => {
    const newProgress = Math.min(upgradeProgress() + (100 / props.upgradeDuration), 100);
    setUpgradeProgress(newProgress);
    setUpgradeTimeLeft(Math.max(0, props.upgradeDuration - (props.upgradeDuration * (newProgress / 100))));
  }, 1000);

  onCleanup(() => {
    clearInterval(resourceTimer);
    clearInterval(upgradeTimer);
  });

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

  const handleUpgrade = () => {
    if (upgradeProgress() === 100) {
      setUpgradeProgress(0);
      setUpgradeTimeLeft(props.upgradeDuration);
      props.onLevelUp();
    }
  };

  return (
    <div class="w-full h-32 select-none flex-shrink-0">
      <div class={`relative h-full ${props.color} rounded-lg border border-white/10`}>
        {/* Название и уровень */}
        <div class="h-8 flex items-center justify-between px-3 text-white/80 text-sm font-medium border-b border-white/10">
          <span>{props.name}</span>
          <span class="flex items-center justify-center w-6 h-6 rounded-md text-xs bg-black/30">
            {props.level}
          </span>
        </div>

        {/* Кнопки сбора и повышения уровня */}
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-6">
          <BuildingButton
            onClick={handleCollect}
            disabled={progress() < 100}
            color={props.color}
            icon={props.icon}
            label={props.resourceName}
            timer={progress() < 100 ? formatTime(timeLeft()) : undefined}
            pulseAnimation={progress() === 100}
          />

          <BuildingButton
            onClick={handleUpgrade}
            disabled={upgradeProgress() < 100}
            color={props.color}
            icon="↑"
            label="Улучшить"
            timer={upgradeProgress() < 100 ? formatTime(upgradeTimeLeft()) : undefined}
            pulseAnimation={upgradeProgress() === 100}
          />
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
      resourceName: 'Вакцина',
      level: 1, 
      collectionTime: 300,
      upgradeDuration: 600,
      icon: '🧪',
      initialUpgradeProgress: 75,
      onLevelUp: () => {
        console.log('Повышение уровня лаборатории');
      }
    },
    { 
      color: 'bg-emerald-900',
      name: 'Лесопилка', 
      resourceName: 'Древесина',
      level: 1, 
      collectionTime: 180,
      upgradeDuration: 360,
      icon: '🪵',
      onLevelUp: () => {
        console.log('Повышение уровня лесопилки');
      }
    },
    { 
      color: 'bg-yellow-900',
      name: 'Ферма', 
      resourceName: 'Еда',
      level: 1, 
      collectionTime: 120,
      upgradeDuration: 300,
      icon: '🌾',
      initialProgress: 100,
      initialUpgradeProgress: 100,
      onLevelUp: () => {
        console.log('Повышение уровня фермы');
      }
    },
    { 
      color: 'bg-orange-900',
      name: 'Заправка', 
      resourceName: 'Топливо',
      level: 1, 
      collectionTime: 240,
      upgradeDuration: 480,
      icon: '🛢️',
      onLevelUp: () => {
        console.log('Повышение уровня заправки');
      }
    },
    { 
      color: 'bg-slate-700',
      name: 'Плавильня', 
      resourceName: 'Сталь',
      level: 1, 
      collectionTime: 360,
      upgradeDuration: 720,
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

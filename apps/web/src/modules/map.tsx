import { BuildingButton } from "@/components/building-button";
import { createSignal, onCleanup, For } from "solid-js";
import { RESOURCES } from '@/constants/resources';
import { Icon } from 'solid-heroicons';
import { arrowUp } from 'solid-heroicons/outline';
import { useNavigate } from '@solidjs/router';

const ARMORY_CONFIG = {
  icon: '🗡️',
  actionName: 'Создать'
} as const;

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
  const navigate = useNavigate();
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
    if (isArmory) {
      navigate('/armory');
      return;
    }
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

  // Получаем базовый цвет из пропса и создаем вариации для градиента
  const baseColor = props.color.replace('bg-', '');
  const gradientClass = {
    'cyan': 'from-cyan-900/50 via-cyan-800/30 to-cyan-900/50',
    'emerald': 'from-emerald-900/50 via-emerald-800/30 to-emerald-900/50',
    'yellow': 'from-yellow-900/50 via-yellow-800/30 to-yellow-900/50',
    'orange': 'from-orange-900/50 via-orange-800/30 to-orange-900/50',
    'slate': 'from-slate-800/50 via-slate-700/30 to-slate-800/50',
  }[baseColor.split('-')[0]] || 'from-slate-900/50 via-slate-800/30 to-slate-900/50';

  const isArmory = props.name === 'Арсенал';
  
  return (
    <div class="w-full h-32 select-none flex-shrink-0">
      <div class={`relative h-full ${props.color} rounded-lg border border-white/10 overflow-hidden group`}>
        {/* Анимированный градиентный фон */}
        <div class={`absolute inset-0 bg-gradient-to-r ${gradientClass} animate-[pulse_4s_ease-in-out_infinite]`} />
        
        {/* Светящиеся частицы */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
          <div class="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
        </div>

        {/* Анимированная подсветка при наведении */}
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent" />
          <div class="absolute w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-2xl animate-pulse" />
        </div>

        {/* Название и уровень */}
        <div class="relative h-8 flex items-center justify-between px-3 text-white/80 text-sm font-medium border-b border-white/10 bg-black/10 backdrop-blur-sm">
          <span class="drop-shadow-glow">{props.name}</span>
          <span class="flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold bg-black/20 backdrop-blur-sm">
            {props.level}
          </span>
        </div>

        {/* Кнопки сбора и повышения уровня */}
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-6">
          <BuildingButton
            onClick={handleCollect}
            disabled={isArmory ? false : progress() < 100}
            color={props.color}
            icon={isArmory ? ARMORY_CONFIG.icon : props.icon}
            label={isArmory ? ARMORY_CONFIG.actionName : props.resourceName}
            timer={isArmory ? undefined : progress() < 100 ? formatTime(timeLeft()) : undefined}
            pulseAnimation={isArmory ? false : progress() === 100}
          />

          <BuildingButton
            onClick={handleUpgrade}
            disabled={upgradeProgress() < 100}
            color={props.color}
            icon={<Icon path={arrowUp} class="w-5 h-5" />}
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
      resourceName: RESOURCES.VACCINE.name,
      level: 3, 
      collectionTime: 300,
      upgradeDuration: 600,
      icon: RESOURCES.VACCINE.icon,
      initialUpgradeProgress: 75,
      onLevelUp: () => {
        console.log('Повышение уровня лаборатории');
      }
    },
    { 
      color: 'bg-emerald-900',
      name: 'Лесопилка', 
      resourceName: RESOURCES.WOOD.name,
      level: 5, 
      collectionTime: 180,
      upgradeDuration: 360,
      icon: RESOURCES.WOOD.icon,
      onLevelUp: () => {
        console.log('Повышение уровня лесопилки');
      }
    },
    { 
      color: 'bg-yellow-900',
      name: 'Ферма', 
      resourceName: RESOURCES.FOOD.name,
      level: 4, 
      collectionTime: 120,
      upgradeDuration: 300,
      icon: RESOURCES.FOOD.icon,
      initialProgress: 100,
      initialUpgradeProgress: 100,
      onLevelUp: () => {
        console.log('Повышение уровня фермы');
      }
    },
    { 
      color: 'bg-orange-900',
      name: 'Заправка', 
      resourceName: RESOURCES.FUEL.name,
      level: 2, 
      collectionTime: 240,
      upgradeDuration: 480,
      icon: RESOURCES.FUEL.icon,
      onLevelUp: () => {
        console.log('Повышение уровня заправки');
      }
    },
    { 
      color: 'bg-slate-700',
      name: 'Плавильня', 
      resourceName: RESOURCES.STEEL.name,
      level: 1, 
      collectionTime: 360,
      upgradeDuration: 720,
      icon: RESOURCES.STEEL.icon,
      onLevelUp: () => {
        console.log('Повышение уровня плавильни');
      }
    },
    { 
      color: 'bg-red-900',
      name: 'Арсенал', 
      resourceName: '', // пустая строка, так как это не ресурсное здание
      level: 2, 
      collectionTime: 0, // не используется для Арсенала
      upgradeDuration: 600,
      icon: ARMORY_CONFIG.icon,
      onLevelUp: () => {
        console.log('Повышение уровня арсенала');
      }
    },
  ];

  return (
    <div 
      class="h-full w-full relative overflow-hidden"
      style={{
        "background-image": `
          radial-gradient(circle at 50% 50%, rgb(30 41 59), rgb(17 24 39)),
          linear-gradient(135deg, 
            rgba(234, 88, 12, 0.25) 0%,
            rgba(59, 130, 246, 0.2) 25%,
            rgba(234, 88, 12, 0.25) 50%,
            rgba(147, 51, 234, 0.2) 75%,
            rgba(239, 68, 68, 0.25) 100%
          ),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0V0zm30 30h30v30H30V30zM0 30h30v30H0V30z' fill='%23374151' fill-opacity='0.3'/%3E%3C/svg%3E")
        `,
        "background-size": "cover, 400% 400%, 60px 60px",
        "background-position": "center",
        "animation": "background-pan 30s linear infinite"
      }}
    >
      {/* Основной слой с частицами */}
      <div 
        class="absolute inset-0 opacity-40"
        style={{
          "background-image": `
            radial-gradient(circle at 50% 50%, transparent 90%, rgb(17 24 39)),
            radial-gradient(circle at 15% 15%, rgba(234, 88, 12, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 15% 85%, rgba(147, 51, 234, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 85% 85%, rgba(234, 88, 12, 0.4) 0%, transparent 35%)
          `,
          "background-size": "cover",
          "animation": "pulse 3s ease-in-out infinite"
        }}
      />
      {/* Дополнительный слой с движущимися частицами */}
      <div 
        class="absolute inset-0 opacity-30"
        style={{
          "background-image": `
            radial-gradient(circle at 30% 30%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
            radial-gradient(circle at 70% 70%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.3) 0%, transparent 35%)
          `,
          "background-size": "100% 100%",
          "animation": "particles-move 15s ease-in-out infinite alternate"
        }}
      />
      {/* Дополнительный слой с подсветкой */}
      <div 
        class="absolute inset-0 opacity-20"
        style={{
          "background-image": `
            linear-gradient(45deg,
              rgba(234, 88, 12, 0.4) 0%,
              transparent 45%,
              transparent 55%,
              rgba(234, 88, 12, 0.4) 100%
            )
          `,
          "background-size": "200% 200%",
          "animation": "background-pan 20s linear infinite"
        }}
      />
      <div class="hide-scrollbar grid grid-cols-2 gap-3 overflow-y-auto h-full py-48 px-4 relative z-10">
        <For each={buildings}>{building => (
          <BuildingCard {...building} />
        )}</For>
      </div>
    </div>
  );
};

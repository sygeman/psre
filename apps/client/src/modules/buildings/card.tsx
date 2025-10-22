import { useNavigate } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import { arrowUp, rocketLaunch } from "solid-heroicons/outline"
import { createSignal, onCleanup } from "solid-js"
import { BuildingButton } from "@/components/building-button"

const ARMORY_CONFIG = {
  icon: "🗡️",
  actionName: "Создать",
} as const

export type BuildingProps = {
  color: string
  name: string
  resourceName: string
  level: number
  collectionTime: number
  upgradeDuration: number
  icon: string
  initialProgress?: number
  initialUpgradeProgress?: number
  upgrade: () => void
  collect: () => void
  boost: () => void
}

export function BuildingCard(props: BuildingProps) {
  const navigate = useNavigate()
  const [progress, setProgress] = createSignal(props.initialProgress || 0)
  const [timeLeft, setTimeLeft] = createSignal(
    props.initialProgress === 100 ? 0 : props.collectionTime,
  )

  const [upgradeProgress, setUpgradeProgress] = createSignal(
    props.initialUpgradeProgress || 0,
  )
  const [upgradeTimeLeft, setUpgradeTimeLeft] = createSignal(
    props.initialUpgradeProgress === 100 ? 0 : props.upgradeDuration,
  )

  // Таймер для сбора ресурсов
  const resourceTimer = setInterval(() => {
    const newProgress = Math.min(progress() + 100 / props.collectionTime, 100)
    setProgress(newProgress)
    setTimeLeft(
      Math.max(
        0,
        props.collectionTime - props.collectionTime * (newProgress / 100),
      ),
    )
  }, 1000)

  // Таймер для улучшения
  const upgradeTimer = setInterval(() => {
    const newProgress = Math.min(
      upgradeProgress() + 100 / props.upgradeDuration,
      100,
    )
    setUpgradeProgress(newProgress)
    setUpgradeTimeLeft(
      Math.max(
        0,
        props.upgradeDuration - props.upgradeDuration * (newProgress / 100),
      ),
    )
  }, 1000)

  onCleanup(() => {
    clearInterval(resourceTimer)
    clearInterval(upgradeTimer)
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCollect = () => {
    if (isArmory) {
      navigate("/armory")
      return
    }
    if (progress() === 100) {
      setProgress(0)
      setTimeLeft(props.collectionTime)
      props.collect()
    }
  }

  const handleUpgrade = () => {
    if (upgradeProgress() === 100) {
      setUpgradeProgress(0)
      setUpgradeTimeLeft(props.upgradeDuration)
      props.upgrade()
    }
  }

  // Получаем базовый цвет из пропса и создаем вариации для градиента
  const baseColor = props.color.replace("bg-", "")
  const gradientClass =
    {
      cyan: "from-cyan-900/50 via-cyan-800/30 to-cyan-900/50",
      emerald: "from-emerald-900/50 via-emerald-800/30 to-emerald-900/50",
      yellow: "from-yellow-900/50 via-yellow-800/30 to-yellow-900/50",
      orange: "from-orange-900/50 via-orange-800/30 to-orange-900/50",
      slate: "from-slate-800/50 via-slate-700/30 to-slate-800/50",
    }[baseColor.split("-")[0]] ||
    "from-slate-900/50 via-slate-800/30 to-slate-900/50"

  const isArmory = props.name === "Арсенал"

  return (
    <div class="w-full h-32 select-none flex-shrink-0">
      <div
        class={`relative h-full ${props.color} rounded-lg border border-white/10 overflow-hidden group`}
      >
        {/* Анимированный градиентный фон */}
        <div
          class={`absolute inset-0 bg-gradient-to-r ${gradientClass} animate-[pulse_4s_ease-in-out_infinite]`}
        />

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
            timer={
              isArmory
                ? undefined
                : progress() < 100
                  ? formatTime(timeLeft())
                  : undefined
            }
            pulseAnimation={isArmory ? false : progress() === 100}
          />

          <BuildingButton
            onClick={handleUpgrade}
            disabled={upgradeProgress() < 100}
            color={props.color}
            icon={<Icon path={arrowUp} class="w-5 h-5" />}
            label="Улучшить"
            timer={
              upgradeProgress() < 100
                ? formatTime(upgradeTimeLeft())
                : undefined
            }
            pulseAnimation={upgradeProgress() === 100}
          />

          <BuildingButton
            onClick={props.boost}
            disabled={upgradeProgress() === 100}
            color={props.color}
            icon={<Icon path={rocketLaunch} class="w-5 h-5" />}
            label="Ускорить"
          />
        </div>
      </div>
    </div>
  )
}

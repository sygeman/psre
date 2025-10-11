import { PointsProgressBar } from "@/components/points-progress-bar"
import { accountState } from "@/stores/state"
import { useNavigate } from "@solidjs/router"
import { CharacterAvatar } from "@/components/character-avatar"
import { AnimatedNumber } from "@/components/animated-number"

export const PersonPanel = () => {
  const navigate = useNavigate()

  return (
    <div class="w-24 text-sm backdrop-blur-sm">
      <div
        class="relative flex size-24 cursor-pointer bg-slate-700/80 transition-colors hover:bg-slate-600/80 overflow-hidden group"
        onClick={() => navigate("/person")}
      >
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />

        <CharacterAvatar class="size-24 relative z-10" />
        <div class="absolute top-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 z-20 backdrop-blur-sm border border-white/10 text-yellow-100 font-medium shadow-lg text-xs">
          <AnimatedNumber value={accountState.level} compact={false} />
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-slate-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div class="space-y-0.5 p-0.5">
        <PointsProgressBar
          points={() => accountState.stamina_points}
          icon="🔋"
          color="bg-gradient-to-r from-orange-600 to-orange-500"
          labelClass="bg-orange-900/80"
          showValue
        />
        <PointsProgressBar
          points={() => accountState.action_points}
          icon="⚡"
          color="bg-gradient-to-r from-blue-600 to-blue-500"
          labelClass="bg-blue-900/80"
          showValue
        />
      </div>
    </div>
  )
}

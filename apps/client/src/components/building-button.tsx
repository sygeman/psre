import type { JSX } from "solid-js"

type BuildingButtonProps = {
  onClick: (e: MouseEvent) => void
  disabled?: boolean
  color: string
  icon: JSX.Element
  label?: string
  timer?: string
  pulseAnimation?: boolean
}

export function BuildingButton(props: BuildingButtonProps) {
  return (
    <div class="relative flex flex-col items-center w-12">
      <div class="relative w-12 h-12">
        <button
          onClick={props.onClick}
          disabled={props.disabled}
          class={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
            props.pulseAnimation
              ? `bg-slate-800/80 cursor-pointer ring-2 ring-white/20`
              : `bg-slate-900 ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`
          }`}
        >
          <span class={`relative flex items-center justify-center w-8 h-8 rounded-full ${props.color}`}>
            {props.pulseAnimation && (
              <span class="absolute inset-0 rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
            )}
            <span class="relative">{props.icon}</span>
          </span>

          {props.timer && (
            <div class="absolute inset-0 flex items-center justify-center text-xs text-white/60 bg-black/50 rounded-full z-20">
              {props.timer}
            </div>
          )}
        </button>
      </div>
      {props.label && <span class="mt-1 text-xs text-white/60">{props.label}</span>}
    </div>
  )
}

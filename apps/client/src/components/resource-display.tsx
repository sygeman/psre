import { Component } from "solid-js"
import { RESOURCES } from "@/constants"
import { AnimatedNumber } from "./animated-number"

type Props = {
  icon: string
  value: number
}

export const ResourceDisplay: Component<Props> = (props) => {
  return (
    <div class="relative flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 backdrop-blur-sm">
      {/* Градиентная обводка */}
      <div class="absolute inset-0 -z-10 rounded ring-1 ring-white/10" />

      {/* Внутренний градиент */}
      <div class="absolute inset-0 -z-10 rounded bg-gradient-to-b from-white/5 to-transparent" />

      <span class="drop-shadow-glow">{props.icon || RESOURCES.DIAMOND.icon}</span>
      <span class="font-medium text-slate-200">
        <AnimatedNumber value={props.value} compact={false} />
      </span>
    </div>
  )
}

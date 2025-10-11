import { useNavigate } from "@solidjs/router"
import { RESOURCES } from "@/constants"
import { AnimatedNumber } from "@/components/animated-number"
import { createResources } from "./create-resources"

export const ResourcesPanel = () => {
  const navigate = useNavigate()
  const { food, wood, steel, fuel, diamond } = createResources()

  return (
    <div class="grid h-8 w-full grid-cols-5 px-4 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        onClick={() => navigate("/shop")}
      >
        <span class="flex-shrink-0">{RESOURCES.FOOD.icon}</span>
        <span class="truncate">
          <AnimatedNumber value={food()} />
        </span>
      </div>
      <div
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        onClick={() => navigate("/shop")}
      >
        <span class="flex-shrink-0">{RESOURCES.WOOD.icon}</span>
        <span class="truncate">
          <AnimatedNumber value={wood()} />
        </span>
      </div>
      <div
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        onClick={() => navigate("/shop")}
      >
        <span class="flex-shrink-0">{RESOURCES.STEEL.icon}</span>
        <span class="truncate">
          <AnimatedNumber value={steel()} />
        </span>
      </div>
      <div
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        onClick={() => navigate("/shop")}
      >
        <span class="flex-shrink-0">{RESOURCES.FUEL.icon}</span>
        <span class="truncate">
          <AnimatedNumber value={fuel()} />
        </span>
      </div>
      <div
        class="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-gray-100 min-w-0"
        onClick={() => navigate("/shop")}
      >
        <span class="flex-shrink-0">{RESOURCES.DIAMOND.icon}</span>
        <span class="truncate">
          <AnimatedNumber value={diamond()} />
        </span>
        <span class="inline-flex items-center font-bold text-yellow-400 flex-shrink-0">+</span>
      </div>
    </div>
  )
}

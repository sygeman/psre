import { GameLayout } from "@/layouts/game-layout"
import { Map } from "@/modules/map"

export function HomePage() {
  return (
    <GameLayout>
      <div class="h-full w-full">
        <Map />
      </div>
    </GameLayout>
  )
}

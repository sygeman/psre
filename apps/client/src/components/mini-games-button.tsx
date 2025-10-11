import { useNavigate } from "@solidjs/router"
import { BuildingButton } from "./building-button"

export function MiniGamesButton() {
  const navigate = useNavigate()

  return <BuildingButton onClick={() => navigate("/mini-games")} color="bg-purple-500" icon="🎮" />
}

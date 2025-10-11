import { createStore } from "solid-js/store"

type AllianceStore = {
  helpAvailable: number
}

export const [allianceStore, setAllianceStore] = createStore<AllianceStore>({
  helpAvailable: 0,
})

export const initAllianceHelp = () => {
  setInterval(() => {
    setAllianceStore("helpAvailable", (current) => {
      return current < 20 ? current + 1 : current
    })
  }, 5000)
}

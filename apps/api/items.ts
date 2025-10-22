const commonTypes = ["build", "research", "training"]
const onlyTimeTypes = ["omni", "heal"]
const onlyPercentTypes = ["gathering"]

const timeEffects = [
  "1m",
  "5m",
  "10m",
  "15m",
  "30m",
  "1h",
  "3h",
  "8h",
  "15h",
  "24h",
  "3d",
  "7d",
]

const percentEffects = ["10p", "30p", "50p", "100p"]

const ITEMS = [
  ...[...commonTypes, ...onlyTimeTypes].flatMap((type) =>
    timeEffects.map((effect) => `speedup-${type}-${effect}`),
  ),
  ...[...commonTypes, ...onlyPercentTypes].flatMap((type) =>
    percentEffects.map((effect) => `speedup-${type}-${effect}`),
  ),
]

await Bun.write(
  "./src/schema/items.ts",
  `export const ITEMS = ${JSON.stringify(ITEMS, null, 2)} as const`,
)

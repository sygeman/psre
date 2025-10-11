import { createEffect, createSignal } from "solid-js"

type Props = {
  value: number
  duration?: number
  compact?: boolean
}

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
})

const standardFormatter = new Intl.NumberFormat("en-US")

export function AnimatedNumber(props: Props) {
  const [displayValue, setDisplayValue] = createSignal(props.value)
  const [prevValue, setPrevValue] = createSignal(props.value)

  createEffect(() => {
    if (props.value === prevValue()) return

    const start = prevValue()
    const end = props.value
    const duration = props.duration || 300
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Функция плавности (ease-out)
      const easeProgress = 1 - (1 - progress) ** 3

      const current = start + (end - start) * easeProgress
      setDisplayValue(Math.round(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    setPrevValue(props.value)
    requestAnimationFrame(animate)
  })

  return (
    <>{props.compact !== false ? compactFormatter.format(displayValue()) : standardFormatter.format(displayValue())}</>
  )
}

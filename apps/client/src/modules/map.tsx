import { Application, Container, Graphics, Point } from "pixi.js"
import { onCleanup, onMount } from "solid-js"

export const Map = () => {
  let canvasRef

  onMount(async () => {
    const app = new Application()

    await app.init({
      background: "#000",
      resizeTo: window,
      canvas: canvasRef,
    })

    const tileWidth = 56
    const tileHeight = 28
    const mapSize = 5
    const colors = [0xa3bffa, 0xf4a3a3, 0xa3e4a3, 0xf3e2a9, 0xd1a3f4]
    const tiles = []

    const mapContainer = new Container()
    mapContainer.scale.set(2)
    app.stage.addChild(mapContainer)

    app.stage.on("pointermove", () => {
      console.log("start")
      app.stage.interactiveChildren = false // Отключаем интерактивность дочерних элементов
    })

    // Возвращаем интерактивность после перемещения
    app.stage.on("pointerup", () => {
      console.log("end")
      app.stage.interactiveChildren = true
    })

    // Центрируем карту
    mapContainer.x = app.screen.width / 2
    mapContainer.y = app.screen.height / 2

    for (let x = 0; x < mapSize; x++) {
      tiles[x] = []
      for (let y = 0; y < mapSize; y++) {
        const tile = new Graphics()
        const color = colors[Math.floor(Math.random() * colors.length)]
        tile.fill({ color })
        tile.moveTo(0, -tileHeight / 2)
        tile.lineTo(tileWidth / 2, 0)
        tile.lineTo(0, tileHeight / 2)
        tile.lineTo(-tileWidth / 2, 0)
        tile.closePath()
        tile.fill()

        tile.x = ((x - y) * tileWidth) / 2
        tile.y = ((x + y) * tileHeight) / 2

        tile.eventMode = "static"
        tile.cursor = "pointer"
        tile.on("pointerdown", () =>
          console.log(`Color: 0x${color.toString(16).padStart(6, "0")}`),
        )

        tiles[x][y] = tile
        mapContainer.addChild(tile)
      }
    }

    // Зум по колесу мыши
    app.canvas.addEventListener("wheel", (event) => {
      event.preventDefault()
      const zoomSpeed = 0.05
      const minScale = 1
      const maxScale = 3

      const rect = app.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const worldPos = {
        x: (mouseX - mapContainer.x) / mapContainer.scale.x,
        y: (mouseY - mapContainer.y) / mapContainer.scale.y,
      }

      const scaleChange = event.deltaY > 0 ? -zoomSpeed : zoomSpeed
      let newScale = mapContainer.scale.x + scaleChange
      newScale = Math.max(minScale, Math.min(maxScale, newScale))

      mapContainer.scale.set(newScale)
      mapContainer.x = mouseX - worldPos.x * newScale
      mapContainer.y = mouseY - worldPos.y * newScale
    })

    // Перемещение карты (drag) и отключение клика при перетаскивании
    let isDragging = false
    let isDraggingStarted = false
    let prevMousePos = { x: 0, y: 0 }
    const dragThreshold = 5

    app.canvas.addEventListener("mousedown", (event) => {
      isDragging = true
      isDraggingStarted = false
      const rect = app.canvas.getBoundingClientRect()
      prevMousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    })

    app.canvas.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const rect = app.canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const movedDistance = Math.sqrt(
          (mouseX - prevMousePos.x) ** 2 + (mouseY - prevMousePos.y) ** 2,
        )

        if (movedDistance > dragThreshold) {
          isDraggingStarted = true
          mapContainer.x += mouseX - prevMousePos.x
          mapContainer.y += mouseY - prevMousePos.y
          prevMousePos = { x: mouseX, y: mouseY }
        }
      }
    })

    app.canvas.addEventListener("mouseup", (event) => {
      if (isDragging && !isDraggingStarted) {
        const rect = app.canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const point = new Point(mouseX, mouseY)
        const worldPoint = mapContainer.toLocal(point)
        const hitTile = tiles
          .flat()
          .find((tile) => tile.containsPoint(worldPoint))
        if (hitTile) {
          const color = hitTile.graphicsData[0].fillStyle.color
          console.log(`Color: 0x${color.toString(16).padStart(6, "0")}`)
        }
      }
      isDragging = false
      isDraggingStarted = false
    })

    app.canvas.addEventListener("mouseleave", () => {
      isDragging = false
      isDraggingStarted = false
    })

    onCleanup(() => {
      app.destroy()
    })
  })

  return (
    <canvas class="h-full w-full relative overflow-hidden" ref={canvasRef} />
  )
}

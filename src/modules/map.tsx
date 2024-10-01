import { DisplayMode, Engine } from "excalibur";
import { Actor, vec } from "excalibur";
import { createEffect, onCleanup } from "solid-js";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {
    // this.graphics.add(Resources.Sword.toSprite());
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}

class Game extends Engine {
  constructor() {
    super({
      canvasElementId: "game",
      displayMode: DisplayMode.FillContainer,
    });
  }
  initialize() {
    const player = new Player();
    this.add(player);
    this.start();
  }
}

export const Map = () => {
  createEffect(() => {
    const game = new Game();
    game.initialize();
    onCleanup(() => game.dispose());
  });

  return <canvas id="game"></canvas>;
};

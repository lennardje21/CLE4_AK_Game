import * as PIXI from "pixi.js";
import { Game } from "./game";

export class HealthBar extends PIXI.Sprite {
  lenght: number;
  healthBarSprite: PIXI.Sprite;

  constructor(game: Game) {
    super();
    this.healthBarSprite = new PIXI.Sprite(game.loader.resources["healthBarSprite"].texture!);
    this.healthBarSprite.scale.set(2, 7);
    game.pixi.stage.addChild(this.healthBarSprite);
  }
}

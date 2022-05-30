import * as PIXI from "pixi.js";
import { Game } from "./game";

export class HealthBar extends PIXI.Sprite {
  lenght: number;
  healthBarSprite: PIXI.Sprite;
  colorMatrix = new PIXI.filters.ColorMatrixFilter();

  constructor(game: Game) {
    super();
    this.healthBarSprite = new PIXI.Sprite(game.loader.resources["healthBarSprite"].texture!);
    this.healthBarSprite.scale.set(2, 7);
    game.pixi.stage.addChild(this.healthBarSprite);
    this.healthBarSprite.filters = [this.colorMatrix];
    this.colorMatrix.hue(100, true);
  }

  updateColor(health: number) {
    this.healthBarSprite.filters = [this.colorMatrix];
    this.colorMatrix.hue(health, true);
  }
}

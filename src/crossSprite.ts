import * as PIXI from "pixi.js";
import { Game } from "./game";
import { questionBox } from "./questionBox";

export class Cross {
  game: Game;
  crossSprite: PIXI.Sprite;
  questionBox: questionBox;

  constructor(game: Game, qBox: questionBox) {
    this.game = game;
    this.crossSprite = new PIXI.Sprite(game.loader.resources["crossSprite"].texture!);
    this.crossSprite.scale.set(0.07);
    this.crossSprite.x = qBox.qBoxSprite.x + 450;
    this.crossSprite.y = qBox.qBoxSprite.y + 210;
  }
}

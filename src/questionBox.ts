import * as PIXI from "pixi.js";
import { Game } from "./game";

export class questionBox {
  question: string;
  answers: string[] = [];
  qBoxSprite: PIXI.Sprite;
  game: Game;
  constructor(game: Game) {
    //show itself
    this.game = game;
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);

    //show answers as A, B, and C

    console.log(this);
  }
}

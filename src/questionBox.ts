import * as PIXI from "pixi.js";
import questionJson from "../static/question.json";
import { Game } from "./game";

export class questionBox {
  question: string;
  qText: PIXI.Text;
  answers: string[] = [];
  qBoxSprite: PIXI.Sprite;
  game: Game;
  constructor(game: Game) {
    //show itself
    this.game = game;
    let questionId: number = this.getRandomInt(1, 3);

    this.question = questionJson["1"].question;
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);
    this.qText = new PIXI.Text(this.question, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
    this.qText.x = this.qBoxSprite.x + 150;
    this.qText.y = this.qBoxSprite.y + 150;
    game.pixi.stage.addChild(this.qText);
    //show answers as A, B, and C
    console.log(this);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

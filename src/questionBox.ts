import * as PIXI from "pixi.js";
import { Answer } from "./answerBox";
import { Game } from "./game";

export class questionBox {
  question: string;
  qText: PIXI.Text;

  qBoxSprite: PIXI.Sprite;

  answers: Answer[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;

    //fetch questions from json file
    fetch("question.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        let json = response.json();
        return json;
      })
      .then((json) => {
        this.generateQuestion(json, game);
      })
      .catch(this.errorHandler);
  }

  generateQuestion(data: any, game: Game) {
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);
    let questionId: number = this.getRandomInt(1, 3);

    //question
    this.question = data[questionId].question;
    this.qText = new PIXI.Text(this.question, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
    this.qText.x = this.qBoxSprite.x + 150;
    this.qText.y = this.qBoxSprite.y + 150;

    //append question box sprite
    this.game.pixi.stage.addChild(this.qBoxSprite);

    //append question text
    this.game.pixi.stage.addChild(this.qText);

    //generate answers
    for (let i: number = 0; i < 3; i++) {
      let answer = new Answer(game, questionId, this.qBoxSprite);
      this.answers.push(answer);
    }
  }

  errorHandler(event: any) {
    console.log(event);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

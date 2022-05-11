import * as PIXI from "pixi.js";
import { Game } from "./game";

export class questionBox {
  question: string;
  qText: PIXI.Text;

  answers: string[] = [];
  aText: PIXI.Text;

  correctAnswer: number;

  qBoxSprite: PIXI.Sprite;

  game: Game;
  constructor(game: Game) {
    //show itself
    this.game = game;

    //fetch questions json
    fetch("question.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        let json = response.json();
        return json;
      })
      .then((json) => {
        this.generateQuestion(json);
      })
      .catch(this.errorHandler);

    //show box
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);

    //show answers as A, B, and C

    console.log(this);
  }

  generateQuestion(data: any) {
    let questionId: number = this.getRandomInt(1, 3);

    //question
    this.question = data[questionId].question;
    this.qText = new PIXI.Text(this.question, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
    this.qText.x = this.qBoxSprite.x + 150;
    this.qText.y = this.qBoxSprite.y + 150;

    //answers
    data[questionId].answers.forEach((answer: string, index: number) => {
      this.aText = new PIXI.Text(answer, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
      this.aText.x = this.qBoxSprite.x + 150 + index * 150;
      this.aText.y = this.qBoxSprite.y + 350;
      this.game.pixi.stage.addChild(this.aText);
    });

    this.game.pixi.stage.addChild(this.qText);
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

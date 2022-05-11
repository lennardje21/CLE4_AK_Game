import * as PIXI from "pixi.js";
import { Game } from "./game";

export class questionBox {
  question: string;
  qText: PIXI.Text;

  answers: string[] = [];
  aText: PIXI.Text;

  correctAnswer: number;

  aBoxSprite: PIXI.Sprite;

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
        this.generateQuestion(json, game);
      })
      .catch(this.errorHandler);

    //show box
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);

    //show answers as A, B, and C

    console.log(this);
  }

  generateQuestion(data: any, game: Game) {
    let questionId: number = this.getRandomInt(1, 3);

    //question
    this.question = data[questionId].question;
    this.qText = new PIXI.Text(this.question, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
    this.qText.x = this.qBoxSprite.x + 150;
    this.qText.y = this.qBoxSprite.y + 150;

    //answers
    data[questionId].answers.forEach((answer: string, index: number) => {
      this.aText = new PIXI.Text(answer, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });

      this.aBoxSprite = new PIXI.Sprite(game.loader.resources["aBoxSprite"].texture!);
      this.aBoxSprite.scale.set(0.1, 0.3);
      this.aBoxSprite.anchor.set(0.5);
      this.aBoxSprite.x = this.qBoxSprite.x + 100 * index + 240;
      this.aBoxSprite.y = this.qBoxSprite.y + 380;
      this.aBoxSprite.interactive = true;
      this.aBoxSprite.buttonMode = true;

      this.aBoxSprite.on("pointerdown", (event: Event) => this.onButtonDown(event, answer));

      this.aText.anchor.set(0.5);
      this.aText.x = this.aBoxSprite.x;
      this.aText.y = this.aBoxSprite.y;
      this.game.pixi.stage.addChild(this.aBoxSprite, this.aText);
    });

    this.game.pixi.stage.addChild(this.qText);
  }

  onButtonDown(event: Event, answer: string) {
    console.log(`answer you clicked: ${answer}`);
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

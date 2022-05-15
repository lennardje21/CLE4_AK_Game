import * as PIXI from "pixi.js";
import { Game } from "./game";

export class questionBox {
  question: string;
  qText: PIXI.Text;

  answers: string[] = [];
  aText: PIXI.Text;

  correctAnswer: string;

  aBoxSprite: PIXI.Sprite;

  qBoxSprite: PIXI.Sprite;

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

    //correct answer
    this.correctAnswer = data[questionId].correctA;

    //answers
    data[questionId].answers.forEach((answer: string, index: number) => {
      //show answer box sprite
      this.aBoxSprite = new PIXI.Sprite(game.loader.resources["aBoxSprite"].texture!);
      this.aBoxSprite.scale.set(0.1, 0.3);
      this.aBoxSprite.anchor.set(0.5);
      this.aBoxSprite.x = this.qBoxSprite.x + 100 * index + 240;
      this.aBoxSprite.y = this.qBoxSprite.y + 380;

      //give them text
      this.aText = new PIXI.Text(answer, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
      this.aText.anchor.set(0.5);
      this.aText.x = this.aBoxSprite.x;
      this.aText.y = this.aBoxSprite.y;

      //make them interactive buttons
      this.aBoxSprite.interactive = true;
      this.aBoxSprite.buttonMode = true;
      this.aBoxSprite.on("pointerdown", (event: Event) => this.onButtonDown(event, answer, this.correctAnswer));

      //append answer box sprite and text
      this.game.pixi.stage.addChild(this.aBoxSprite, this.aText);
    });

    //append question box sprite
    this.game.pixi.stage.addChild(this.qBoxSprite);

    //append question text
    this.game.pixi.stage.addChild(this.qText);
  }

  onButtonDown(event: Event, answer: string, correctAnswer: string) {
    if (answer === correctAnswer) {
      //TODO: correct answer behaviour (generate new question, give hitpoints to enemy)
      console.log("correct answer");
    } else {
      //TODO: wrong answer behaviour (take dammage, time penalty, generate new question)
      console.log("wrong answer");
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

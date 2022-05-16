import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Answer {
  aBoxSprite: PIXI.Sprite;
  aText: PIXI.Text;
  game: Game;

  correctAnswer: string;

  constructor(game: Game, questionId: number, qBoxSprite: PIXI.Sprite) {
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
        this.generateAnswers(json, game, questionId, qBoxSprite);
      })
      .catch(this.errorHandler);
  }

  generateAnswers(data: any, game: Game, questionId: number, qBoxSprite: PIXI.Sprite) {
    //correct answer
    this.correctAnswer = data[questionId].correctA;

    //answers
    data[questionId].answers.forEach((answer: string, index: number) => {
      //show answer box sprite
      this.aBoxSprite = new PIXI.Sprite(game.loader.resources["aBoxSprite"].texture!);
      this.aBoxSprite.scale.set(0.1, 0.3);
      this.aBoxSprite.anchor.set(0.5);
      this.aBoxSprite.x = qBoxSprite.x + 100 * index + 240;
      this.aBoxSprite.y = qBoxSprite.y + 380;

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
  }

  onButtonDown(event: Event, answer: string, correctAnswer: string) {
    this.answerHandler(answer, correctAnswer);
  }

  async answerHandler(answer: string, correctAnswer: string) {
    if (answer === correctAnswer) {
      //TODO: correct answer behaviour (generate new question, give hitpoints to enemy)

      //lock the answers so you cant answer correct multiple times
      this.aBoxSprite.interactive = false;
      this.aBoxSprite.buttonMode = false;

      //show that the answer is correct

      //wait 2 seconds
      await this.sleep(2000);

      //generate a new question
      this.game.makeQbox();
      console.log("correct answer");
    } else {
      //TODO: wrong answer behaviour (take dammage, time penalty, generate new question)
      // this.game.makeQbox();
      console.log("wrong answer");
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  errorHandler(event: any) {
    console.log(event);
  }
}

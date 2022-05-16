import * as PIXI from "pixi.js";
import { Answer } from "./answerBox";
import { Game } from "./game";

export class questionBox {
  question: string;
  questionId: number;
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
    //get random question
    this.questionId = this.getRandomInt(1, 3);
    this.question = data[this.questionId].question;

    //question box sprite
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);
    this.game.pixi.stage.addChild(this.qBoxSprite);

    //question text
    this.qText = new PIXI.Text(this.question, { fontFamily: "Arial", fontSize: 24, fill: 0xffffff, align: "center" });
    this.qText.x = this.qBoxSprite.x + 150;
    this.qText.y = this.qBoxSprite.y + 150;
    this.game.pixi.stage.addChild(this.qText);

    //generate answers
    for (let i: number = 0; i < 3; i++) {
      let answer = new Answer(game, this, i);
      this.answers.push(answer);
    }
  }

  async answerHandler(event: Event, answer: string, correctAnswer: string) {
    if (answer === correctAnswer) {
      //TODO: correct answer behaviour (generate new question, give hitpoints to enemy)
      console.log("correct answer");

      //lock the answers so you cant answer correct multiple times
      this.answers.forEach((a: Answer, index: number) => {
        console.log(a);

        a.aBoxSprite.interactive = false;
        a.aBoxSprite.buttonMode = false;
      });

      //show that the answer is correct

      //wait 5 seconds
      await this.sleep(5000);

      //generate a new question
      this.game.makeQbox();
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

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

import * as PIXI from "pixi.js";
import { Answer } from "./answerBox";
import { Game } from "./game";
import { Check } from "./check";
import { Cross } from "./crossSprite";
import { Enemy } from "./enemy";
import { Hero } from "./hero";

export class questionBox {
  question: string;
  questionId: number;

  qText: PIXI.Text;

  qBoxSprite: PIXI.Sprite;

  answers: Answer[] = [];

  game: Game;

  enemy: Enemy;

  hero: Hero;

  constructor(game: Game, hero: Hero, enemy : Enemy) {
    this.game = game;
    this.hero = hero;
    this.enemy = enemy;

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
    this.questionId = this.getRandomInt(1, 4);
    this.question = data[this.questionId].question;

    //question box sprite
    this.qBoxSprite = new PIXI.Sprite(game.loader.resources["qBoxSprite"].texture!);
    // this.qBoxSprite.scale.set(3, 2);
    // this.qBoxSprite.anchor.set(0.5)
    this.qBoxSprite.width = 750
    this.qBoxSprite.height = 200
    this.qBoxSprite.x = 265;
    this.qBoxSprite.y = 520;
    this.game.pixi.stage.addChild(this.qBoxSprite);

    //question text
    const style = new PIXI.TextStyle({
      fontFamily: "ArcadeFont",
      fontSize: 25,
      fill: 0x000000,
      align: "center",
    });

    this.qText = new PIXI.Text(this.question, style);
    this.qText.resolution = 10;
    this.qText.anchor.set(0.5)
    this.qText.x = this.qBoxSprite.x + 375;
    this.qText.y = this.qBoxSprite.y + 50;
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

      //show that the answer is correct
      let check = new Check(this.game, this);

      //lock the answers so you cant answer correct multiple times
      this.answers.forEach((a: Answer, index: number) => {
        //change to black and white texture
        a.aBoxSprite.texture = this.game.loader.resources["aBoxSpriteDeactivated"].texture!;

        a.aBoxSprite.interactive = false;
        a.aBoxSprite.buttonMode = false;
      });

      this.hero.attack();

      //wait 5 seconds
      await this.sleep(1500);
      this.qText.destroy();
      this.qBoxSprite.destroy();

      //generate a new question
      if (this.hero.health > 0 && this.game.enemy.health > 0) {
        this.game.makeQbox();
      }
    } else {
      //TODO: wrong answer behaviour (generate new question, give hitpoints to player)
      console.log("wrong answer");

      //show that the answer is wrong
      // let cross = new Cross(this.game, this);

      //make the enemy attack the hero and the hero lose health

      //lock the answers so you cant answer correct multiple times
      this.answers.forEach((a: Answer, index: number) => {
        //change to black and white texture
        a.aBoxSprite.texture = this.game.loader.resources["aBoxSpriteDeactivated"].texture!;

        a.aBoxSprite.interactive = false;
        a.aBoxSprite.buttonMode = false;
      });

      this.game.enemy.attack();
      this.hero.takeDamage();

      //wait 1.5 seconds
      await this.sleep(1500);
      this.qText.destroy();
      this.qBoxSprite.destroy();

      //generate a new question
      if (this.hero.health > 0 && this.game.enemy.health > 0) {
        this.game.makeQbox();
      }
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

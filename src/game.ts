import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import { Bird } from "./bird";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
import birdSprite1 from "./images/birdSprite1.png";
import crossSprite from "./images/crossSprite.png";
import checkSprite from "./images/checkSprite.png";
import background from "./images/background.png";
import { Assets } from "./assets";
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";
import { Ticker } from "pixi.js";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  zombie: Enemy;
  knight: Hero;
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);
    this.loader = new PIXI.Loader();
    this.loader.add("qBoxSprite", qBoxSprite);
    this.loader.add("aBoxSprite", aBoxSprite);
    this.loader.add("background", background);
    this.loader.add("aBoxSpriteDeactivated", aBoxSpriteDeactivated);
    this.loader.add("birdSprite1", birdSprite1);
    this.loader.add("crossSprite", crossSprite);
    this.loader.add("checkSprite", checkSprite);

    //haal de json op om de animated spritesheet te maken
    new Assets(this);
    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    const background = new Background(this.loader.resources["background"].texture!, this.screenWidth, this.screenHeight);
    this.pixi.stage.addChild(background);

    //in frames komen de images te staan die de enemy animate
    let enemyFrames = this.createZombieFrames();
    let knightFrames = this.createKnightFrames();

    this.knight = new Hero(this, knightFrames);
    //creeër een nieuwe zombie
    this.zombie = new Enemy(this, this.knight, enemyFrames);
    this.makeQbox();
    this.makeBird();

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  makeBird() {
    let bird = new Bird(this);

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  createKnightFrames() {
    let knightFrames: PIXI.Texture[] = [];

    for (let i = 1; i <= 8; i++) {
      const texture = PIXI.Texture.from(`knight_${i}.png`);
      knightFrames.push(texture);
    }
    return knightFrames;
  }

  createZombieFrames() {
    let enemyFrames: PIXI.Texture[] = [];

    for (let i = 1; i <= 8; i++) {
      const texture = PIXI.Texture.from(`zombie_${i}.png`);
      enemyFrames.push(texture);
    }
    return enemyFrames;
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }

  update(delta: number) {
    this.zombie.move(delta);
  }
}

let game = new Game();

import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import { Zombie } from "./zombie";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
import zombieSprite from "./images/zombieSprite.png"

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);
    this.loader = new PIXI.Loader();
    this.loader.add("qBoxSprite", qBoxSprite);
    this.loader.add("aBoxSprite", aBoxSprite);
    this.loader.add("aBoxSpriteDeactivated", aBoxSpriteDeactivated);
    this.loader.add("zombieSprite", zombieSprite)

    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    this.makeQbox();
    this.makeZombie();
  }

  makeZombie(){
    let zombie = new Zombie(this);
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }
}

let game = new Game();

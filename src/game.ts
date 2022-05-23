import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import { Bird } from "./bird";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import checkSprite from "./images/checkSprite.png";
import crossSprite from "./images/crossSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
import birdSprite1 from "./images/birdSprite1.png"

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
    this.loader.add("birdSprite1", birdSprite1)
    this.loader.add("checkSprite", checkSprite);
    this.loader.add("crossSprite", crossSprite);

    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    this.makeQbox();
    this.makeBird()
    
  }

  makeBird(){
    let bird = new Bird(this);
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }
}

let game = new Game();

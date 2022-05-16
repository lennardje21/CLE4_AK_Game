import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";

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

    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    this.makeQbox();
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }
}

let game = new Game();

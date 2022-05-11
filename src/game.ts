import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    console.log("constructor");
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);
    this.loader = new PIXI.Loader();
    this.loader.add("qBoxSprite", qBoxSprite);
    this.loader.add("aBoxSprite", aBoxSprite);

    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    console.log("loaded");
    let qBox = new questionBox(this);
    this.pixi.stage.addChild(qBox.qBoxSprite);
  }
}

let game = new Game();

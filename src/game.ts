import * as PIXI from "pixi.js";

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
    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    console.log("loaded");
  }
}

let game = new Game();

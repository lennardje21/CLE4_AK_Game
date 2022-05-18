import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import { Zombie } from "./zombie";
import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
<<<<<<< HEAD
import crossSprite from "./images/crossSprite.png";
import checkSprite from "./images/checkSprite.png";
import zombieSprite from "./images/zombieSprite.png";
=======
import background from "./images/background.png"
import {Assets} from "./assets"
import { Enemy } from "./enemy";
>>>>>>> enemy

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  zombie: Enemy
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
    this.loader.add("crossSprite", crossSprite);
    this.loader.add("checkSprite", checkSprite);
    this.loader.add("zombieSprite", zombieSprite);

    //haal de json op om de animated spritesheet te maken
    new Assets(this)
    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    //in frames komen de images te staan die de enemy animate
    let frames = this.createZombieFrames()
    //creeër een nieuwe zombie
    this.zombie = new Enemy(this, frames)
    this.makeQbox();
<<<<<<< HEAD
    this.makeZombie();
  }

  makeZombie() {
    let zombie = new Zombie(this);
=======

    this.pixi.ticker.add(() => this.update() )
  }

  createZombieFrames(){
    let frames: PIXI.Texture[] = []

    for (let i = 1; i <= 8; i++) {
      const texture =
              PIXI.Texture.from(`zombie_${i}.png`)
      frames.push(texture)
    }
    return frames
>>>>>>> enemy
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }

  update() {
    this.zombie.move()
  }
}

let game = new Game();

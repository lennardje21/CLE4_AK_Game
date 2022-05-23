import * as PIXI from "pixi.js";
import { questionBox } from "./questionBox";
import { Bird } from "./bird";

import { Assets } from "./assets"
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";

export class Game {
  pixi: PIXI.Application;
  // loader: PIXI.Loader;
  zombie: Enemy
  knight: Hero
  bird: Bird
  screenWidth: number = 1280;
  screenHeight: number = 720;
  loader: PIXI.Loader

  constructor() {
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);
    // this.loader = new PIXI.Loader();
    let assets = new Assets(this)
    this.loader = assets
    
    


    //haal de json op om de animated spritesheet te maken
  }

  loadCompleted() {
    const background = new Background(this.loader.resources["background"].texture!, this.screenWidth, this.screenHeight)
    this.pixi.stage.addChild(background)

    //in frames komen de images te staan die de enemy animate
    let frames = this.createZombieFrames()
    let knightFrames = this.createKnightFrames()
    let birdFrames =  this.createBirdFrames()
  

    this.knight = new Hero(this, knightFrames)
    //creeër een nieuwe zombie
    this.zombie = new Enemy(this, frames)
    // nieuwe bird
    this.bird = new Bird(this, birdFrames)

  
    this.makeQbox();
    

    this.pixi.ticker.add(() => this.update() )
  }

 

  createKnightFrames(){
    let knightFrames: PIXI.Texture[] = []

    for (let i = 1; i <= 8; i++) {
      const texture =
              PIXI.Texture.from(`knight_${i}.png`)
              knightFrames.push(texture)
    }
    return knightFrames
  }

  createZombieFrames(){
    let frames: PIXI.Texture[] = []

    for (let i = 1; i <= 8; i++) {
      const texture =
              PIXI.Texture.from(`zombie_${i}.png`)
      frames.push(texture)
    }
    return frames
  }

  createBirdFrames(){
    let frames: PIXI.Texture[] = []

    for (let i = 1; i <= 4; i++) {
      const texture =
              PIXI.Texture.from(`birdSprite${i}.png`)
      frames.push(texture)
    }
    return frames
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

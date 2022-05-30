import * as PIXI from "pixi.js";

//classes
import { questionBox } from "./questionBox";
import { Bird } from "./bird";

import { Assets } from "./assets";
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  Enemy: Enemy;
  hero: Hero;
  bird: Bird;
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight, backgroundColor: 0x2980b9 });
    document.body.appendChild(this.pixi.view);
    // this.loader = new PIXI.Loader();
    let assets = new Assets(this);
    this.loader = assets;

    //haal de json op om de animated spritesheet te maken
  }

  loadCompleted() {
    const background = new Background(this.loader.resources["background"].texture!, this.screenWidth, this.screenHeight);
    this.pixi.stage.addChild(background);

    //in frames komen de images te staan die de enemy animate
    let enemyFrames = this.createEnemyFrames();
    let heroFrames = this.createHeroFrames();
    let birdFrames = this.createBirdFrames();

    this.spawnObjects(heroFrames, enemyFrames, birdFrames);

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  spawnObjects(heroFrames: PIXI.Texture[], enemyFrames: PIXI.Texture[], birdFrames: PIXI.Texture[]) {
    this.hero = new Hero(this, heroFrames);
    //creeër een nieuwe Enemy
    this.Enemy = new Enemy(this, this.hero, enemyFrames);
    // nieuwe bird
    this.bird = new Bird(this, this.hero, birdFrames);

    this.makeQbox();
  }
  createHeroFrames() {
    let heroFrames: PIXI.Texture[] = [];

    for (let i = 1; i <= 8; i++) {
      const texture = PIXI.Texture.from(`knight_${i}.png`);
      heroFrames.push(texture);
    }
    return heroFrames;
  }

  createEnemyFrames() {
    let enemyFrames: PIXI.Texture[] = [];

    for (let i = 1; i <= 8; i++) {
      const texture = PIXI.Texture.from(`zombie_${i}.png`);
      enemyFrames.push(texture);
    }
    return enemyFrames;
  }

  createBirdFrames() {
    let frames: PIXI.Texture[] = [];

    for (let i = 1; i <= 4; i++) {
      const texture = PIXI.Texture.from(`birdSprite${i}.png`);
      frames.push(texture);
    }
    return frames;
  }

  makeQbox() {
    let qBox = null;
    qBox = new questionBox(this);
  }

  update(delta: number) {
    this.Enemy.update(delta);
  }
}

let game = new Game();

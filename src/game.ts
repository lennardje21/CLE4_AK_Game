import * as PIXI from "pixi.js";

//classes
import { questionBox } from "./questionBox";
import { Bird } from "./bird";

import { Assets } from "./assets";
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";
import { Texture } from "pixi.js";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  enemy: Enemy;
  hero: Hero;
  bird: Bird;
  screenWidth: number = 1280;
  screenHeight: number = 720;

  constructor() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

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
    let heroFrames: PIXI.Texture[][] = this.createHeroFrames();

    let enemyFrames = this.createEnemyFrames();

    let birdFrames = this.createBirdFrames();

    this.spawnObjects(heroFrames, birdFrames);
    this.spawnZombie(enemyFrames);
    this.pixi.ticker.add((delta) => this.update(delta));
  }

  spawnZombie(enemyFrames: PIXI.Texture[]) {
    //creeër een nieuwe Enemy
    this.enemy = new Enemy(this, this.hero, enemyFrames);
  }

  spawnObjects(heroFrames: PIXI.Texture[][], birdFrames: PIXI.Texture[]) {
    this.hero = new Hero(this, heroFrames);

    // nieuwe bird
    this.bird = new Bird(this, this.hero, birdFrames);

    this.makeQbox();
  }

  createHeroFrames(): PIXI.Texture[][] {
    let characterAttackIdle: PIXI.Texture[] = [];
    let characterAttack: PIXI.Texture[] = [];
    let characterTakeDamage: PIXI.Texture[] = [];

    for (let i = 0; i <= 3; i++) {
      characterAttackIdle.push(PIXI.Texture.from(`HeavyBandit_CombatIdle_${i}.png`));
    }

    for (let i = 0; i <= 7; i++) {
      characterAttack.push(PIXI.Texture.from(`HeavyBandit_Attack_${i}.png`));
    }

    for (let i = 0; i <= 1; i++) {
      characterTakeDamage.push(PIXI.Texture.from(`HeavyBandit_Hurt_${i}.png`));
    }

    return [characterAttackIdle, characterAttack, characterTakeDamage];
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
    qBox = new questionBox(this, this.hero);
  }

  update(delta: number) {
    if (this.enemy) {
      this.enemy.update(delta);
    }
  }
}

let game = new Game();

import * as PIXI from "pixi.js";

//classes
import { questionBox } from "./questionBox";
import { Bird } from "./bird";

import { Assets } from "./assets";
import { Enemy } from "./enemy";
import { Background } from "./background";
import { Hero } from "./hero";
import { Texture } from "pixi.js";
import { GameOver } from "./gameEnd/gameOver";
import { Victory } from "./gameEnd/victory";
import { LeaveGame } from "./leaveGame";

export class Game {
  pixi: PIXI.Application;
  loader: PIXI.Loader;
  enemy: Enemy;
  hero: Hero;
  bird: Bird;
  questionExist: boolean = false;

  screenWidth: number = 1280;
  screenHeight: number = 700;

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

    const exitGame = new LeaveGame(this.loader.resources["leaveGame"].texture!)
    this.pixi.stage.addChild(exitGame)

    //in frames komen de images te staan die de enemy animate
    let heroFrames: PIXI.Texture[][] = this.createHeroFrames();

    let enemyFrames: PIXI.Texture[][] = this.createEnemyFrames();

    let birdFrames = this.createBirdFrames();

    this.spawnObjects(heroFrames, birdFrames);
    this.spawnZombie(enemyFrames);
    this.pixi.ticker.add((delta) => this.update(delta));
  }

  spawnZombie(enemyFrames: PIXI.Texture[][]) {
    //creeër een nieuwe Enemy
    this.enemy = new Enemy(this, this.hero, enemyFrames);
  }

  spawnObjects(heroFrames: PIXI.Texture[][], birdFrames: PIXI.Texture[]) {
    this.hero = new Hero(this, heroFrames);

    // nieuwe bird
    this.bird = new Bird(this, birdFrames);

    this.makeQbox();
  }

  createHeroFrames(): Texture[][] {
    let heroAttackIdle: Texture[] = [];
    let heroAttack:     Texture[] = [];
    let heroTakeDamage: Texture[] = [];

    for (let i = 0; i <= 3; i++) {
      heroAttackIdle.push(PIXI.Texture.from(`HeavyBandit_CombatIdle_${i}.png`));
    }

    for (let i = 0; i <= 7; i++) {
      heroAttack.push(PIXI.Texture.from(`HeavyBandit_Attack_${i}.png`));
    }

    for (let i = 0; i <= 1; i++) {
      heroTakeDamage.push(PIXI.Texture.from(`HeavyBandit_Hurt_${i}.png`));
    }

    return [heroAttackIdle, heroAttack, heroTakeDamage];
  }

  createEnemyFrames(): Texture[][] {
    let enemyIdle:        Texture[] = []
    let enemyAttack:      Texture[] = []
    let enemyTakeDamage:  Texture[] = []
    let enemyWalk:        Texture[] = []
    let enemyDie:         Texture[] = []

    for (let i = 1; i <= 11; i++) {
      enemyIdle.push(Texture.from(`skeletonIdle_${i}.png`))
    }
    for (let i = 1; i <= 18; i++) {
      enemyAttack.push(Texture.from(`skeletonAttack_${i}.png`))
    }
    for (let i = 1; i <= 8; i++) {
      enemyTakeDamage.push(Texture.from(`skeletonHit_${i}.png`))
    }
    for (let i = 1; i <= 13; i++) {
      enemyWalk.push(Texture.from(`skeletonWalk_${i}.png`))
    }
    for (let i = 1; i <= 15; i++) {
      enemyDie.push(Texture.from(`SkeletonDie_${i}.png`))
    }
    return [enemyIdle, enemyAttack, enemyTakeDamage, enemyWalk, enemyDie]
  }

  createBirdFrames() {
    let frames: PIXI.Texture[] = [];

    for (let i = 1; i <= 4; i++) {
      const texture = PIXI.Texture.from(`birdSprite${i}.png`);
      frames.push(texture);
    }
    return frames;
  }

  gameOver(win: boolean) {
    if (!win) {
      let gameOver = new GameOver(this.loader.resources["gameOver"].texture!, this.screenWidth, this.screenHeight)
      this.pixi.stage.addChild(gameOver)  
    } else {
      let victory = new Victory(this.loader.resources["victory"].texture!, this.screenWidth, this.screenHeight)
      this.pixi.stage.addChild(victory)  
    }
  }

  makeQbox() {
    let qBox = null;
    console.log(qBox)
    qBox = new questionBox(this, this.hero, this.enemy);
  }

  update(delta: number) {
    if (this.enemy) {
      this.enemy.update(delta);
    }
  }
}

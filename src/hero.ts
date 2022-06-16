import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { Enemy } from "./enemy";
import { Game } from "./game";
import { HealthBar } from "./healthBar";

export class Hero extends PIXI.AnimatedSprite {
  private game: Game;
  private frames: PIXI.Texture[][] = [];

  hitPoints = 25;
  health = 100;
  healthBar: HealthBar;

  //give the attributes of the hero
  constructor(game: Game, textures: Texture[][]) {
    super(textures[0]);

    this.game = game;
    this.frames = textures;

    this.anchor.set(0.5);
    this.scale.set(8, 8);
    this.x = 1000;
    this.y = 300;
    this.animationSpeed = 0.1;
    this.loop = true;
    this.play();

    this.interactive = true;
    //add the hero character to the canvas
    this.game.pixi.stage.addChild(this);
    //healthbar
    this.healthBar = new HealthBar(game);
    this.healthBar.healthBarSprite.y = this.y - 150;
    this.healthBar.healthBarSprite.x = this.x - 100;
    this.idleAnimation();
  }

  attack() {
    this.textures = this.frames[1];
    this.loop = false;
    this.play();
    this.onFrameChange = function (currentFrame: Number) {
      if (currentFrame == 5) {
        this.game.enemy.getHit(this.hitPoints);
      }
    };
    this.onComplete = this.idleAnimation;
  }

  takeDamage() {
    this.health -= 25;
    this.healthBar.healthBarSprite.scale.set(this.health * 0.02, 7);
    this.healthBar.updateColor(this.health);
    if (this.health <= 0) {
      this.die();
    }
    this.textures = this.frames[2];
    this.animationSpeed = 0.05;
    this.loop = false;
    this.play();
    this.onComplete = this.idleAnimation;
  }

  die() {
    console.log("hero died");
    window.location.href = "index.html"
    this.destroy();
  }

  idleAnimation() {
    this.textures = this.frames[0];
    this.animationSpeed = 0.1;
    this.loop = true;
    this.play();
  }
}

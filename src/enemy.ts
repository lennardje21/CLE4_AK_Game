import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { Game } from "./game";
import { Hero } from "./hero";
import { HealthBar } from "./healthBar";

export class Enemy extends PIXI.AnimatedSprite {
  private game: Game;
  hero: Hero;
  health: number = 100;
  healthBar: HealthBar;
  speed: number;

  constructor(game: Game, hero: Hero, textures: Texture[]) {
    super(textures);

    //speed is random (range: 0.2 - 1.0)
    this.speed = 0.2 + Math.random() * 0.8;

    this.game = game;
    this.hero = hero;

    this.anchor.set(0.5);
    this.x = -100;
    this.y = 350 - Math.random() * 50;
    this.loop = true;
    this.animationSpeed = 0.1;
    this.play();

    //append enemy to game screen
    this.game.pixi.stage.addChild(this);
    //healthbar
    this.healthBar = new HealthBar(game);
    this.healthBar.healthBarSprite.y = this.y - 200;
  }

  //gets called every frame
  update(delta: number) {
    if (this) {
      super.update(delta);
      this.move(delta);
      this.upadateHealthBarPosition();
    }
  }

  upadateHealthBarPosition() {
    this.healthBar.healthBarSprite.x = this.x - 100;
  }

  getHit(dammage: number) {
    this.health -= dammage;
    this.healthBar.healthBarSprite.scale.set(this.health * 0.02, 7);
    this.healthBar.updateColor(this.health);

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log("zombie is dead");
    this.game.spawnZombie(this.game.createEnemyFrames());
    this.destroy();
  }

  //moves gameobject
  move(delta: number) {
    if (!this.onCollision(this.hero)) {
      this.x += this.speed * delta;
    } else {
      this.stopAnimation();
    }
  }

  stopAnimation() {
    this.stop;
    this.animationSpeed = 0;
    this.loop = false;
  }

  onCollision(collider: any): boolean {
    let colliderBounds = this.getBounds();
    let otherCollider = collider.getBounds();
    return colliderBounds.x + colliderBounds.width > otherCollider.x && colliderBounds.x < otherCollider.x + otherCollider.width && colliderBounds.y + colliderBounds.height > otherCollider.y && colliderBounds.y < otherCollider.y + otherCollider.height;
  }
}

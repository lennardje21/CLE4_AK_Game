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

  constructor(game: Game, hero: Hero, textures: Texture[]) {
    console.log("I'm a zombie");
    super(textures);

    this.game = game;
    this.hero = hero;

    this.anchor.set(0.5);
    this.x = -100;
    this.y = 300;
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
      this.x += 1 * delta;
    } else {
      // this.stopAnimation();
    }
  }

  stopAnimation() {
    this.stop;
    // this.animationSpeed = 0;
    // this.loop = false;
  }

  onCollision(collider: any): boolean {
    let colliderBounds = this.getBounds();
    let otherCollider = collider.getBounds();
    return colliderBounds.x + colliderBounds.width > otherCollider.x && colliderBounds.x < otherCollider.x + otherCollider.width && colliderBounds.y + colliderBounds.height > otherCollider.y && colliderBounds.y < otherCollider.y + otherCollider.height;
  }
}

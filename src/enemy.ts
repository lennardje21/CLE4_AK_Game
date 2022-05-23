import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { Game } from "./game";
import { Hero } from "./hero";

export class Enemy extends PIXI.AnimatedSprite {
  private game: Game;

  keepMoving: boolean;
  hero: Hero;

  //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
  constructor(game: Game, hero: Hero, textures: Texture[]) {
    console.log("I'm a zombie");
    super(textures);
    this.game = game;
    this.hero = hero;

    this.keepMoving = true;
    this.anchor.set(0.5);
    this.x = -100;
    this.y = 430;
    this.animationSpeed = 0.1;
    this.loop = true;
    this.play();

    //voeg de enemy aan het beeld toe
    this.game.pixi.stage.addChild(this);
  }

  //laat de enemy bewegen
  move(delta: number) {
    if (this.keepMoving === true) {
      if (this.onCollision(this.hero)) {
        this.keepMoving = false;
      }
      if (this.x >= 1400) {
        this.x = -100 * delta;
      }
      this.x += 1 * delta;
    } else {
      this.animationSpeed = 0;
    }
  }

  onCollision(collider: any): boolean {
    let colliderBounds = this.getBounds();
    let otherCollider = collider.getBounds();
    return colliderBounds.x + colliderBounds.width > otherCollider.x && colliderBounds.x < otherCollider.x + otherCollider.width && colliderBounds.y + colliderBounds.height > otherCollider.y && colliderBounds.y < otherCollider.y + otherCollider.height;
  }
}

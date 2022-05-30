import * as PIXI from "pixi.js"
import { Game } from "./game";
import { Hero } from "./hero";

export class Bird extends PIXI.AnimatedSprite {
  game: Game;
  hero: Hero;

  constructor(game: Game, hero: Hero, textures: PIXI.Texture[]) {
    console.log("bird gespawned");
    super(textures);
    this.hero = hero;

    this.game = game;
    this.x = 100;
    this.y = 300;

    // this.birdSprite = new PIXI.Sprite(game.loader.resources["birdSprite1"].texture)
    // this.birdSprite.scale.set(0.5, 0.5)
    // this.birdSprite.y = 480
    // this.game.pixi.stage.addChild(this.birdSprite)
    this.animationSpeed = 0.1;
    // this.loop = true
    // this.gotoAndPlay(4)
    this.game.pixi.stage.addChild(this);

    this.play();
  }

  //gets called every frame
  update(delta: number) {
    super.update(delta);
    this.move(delta);
  }

  //moves gameobject
  move(delta: number) {
    if (!this.onCollision(this.hero)) {
      this.x += 1 * delta;
    } else {
      // this.stopAnimation();
    }
  }
  onCollision(collider: any): boolean {
    let colliderBounds = this.getBounds();
    let otherCollider = collider.getBounds();
    return colliderBounds.x + colliderBounds.width > otherCollider.x && colliderBounds.x < otherCollider.x + otherCollider.width && colliderBounds.y + colliderBounds.height > otherCollider.y && colliderBounds.y < otherCollider.y + otherCollider.height;
  }
}

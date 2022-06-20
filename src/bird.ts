import * as PIXI from "pixi.js";
import { Game } from "./game";
import { Hero } from "./hero";

export class Bird extends PIXI.AnimatedSprite {
  game: Game;

  constructor(game: Game, textures: PIXI.Texture[]) {
    super(textures);

    this.game = game;
    this.x = -50;
    this.y = 50;

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
    this.x += 1 * delta;
    this.y += Math.sin(this.x * 0.03)
    if(this.x >= 1300) {
      this.x = -50
    }
  }

}

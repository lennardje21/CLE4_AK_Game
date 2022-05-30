import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { Game } from "./game";

export class Hero extends PIXI.AnimatedSprite {
  private game: Game;
  //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
  constructor(game: Game, textures: Texture[]) {
    console.log("I'm a hero");
    super(textures);
    this.game = game;

    this.anchor.set(0.5);
    this.x = 1100;
    this.y = 300;
    this.animationSpeed = 0.1;
    this.loop = true;
    this.play();

    //voeg de enemy aan het beeld toe
    this.game.pixi.stage.addChild(this);
  }
}

import * as PIXI from "pixi.js"
import { Texture } from "pixi.js";
import { Enemy } from "./enemy";
import { Game } from "./game";

export class Hero extends PIXI.AnimatedSprite {
  private game: Game;
  private frames: PIXI.Texture[][] = []
  hitPoints = 25;

  //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
  constructor(game: Game, textures: Texture[][]) {
    console.log("I'm a hero");
    super(textures[0]);
    this.game = game;
    this.frames = textures

    this.anchor.set(0.5);
    this.scale.set(8, 8)
    this.x = 1000
    this.y = 350
    this.animationSpeed = 0.1;
    this.loop = true;
    this.play();

    //voeg de enemy aan het beeld toe
    this.game.pixi.stage.addChild(this);
  }

  attack() {
    this.game.enemy.getHit(this.hitPoints);
  }
}

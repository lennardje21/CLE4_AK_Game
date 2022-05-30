import * as PIXI from "pixi.js";
import { Game } from "./game";

import qBoxSprite from "./images/qBoxSprite.png";
import aBoxSprite from "./images/aBoxSprite.png";
import aBoxSpriteDeactivated from "./images/aBoxSpriteDeactivated.png";
// import birdSprite1 from "./images/birdSprite1.png"
import crossSprite from "./images/crossSprite.png";
import checkSprite from "./images/checkSprite.png";
import background from "./images/background.png";
import healthBarSprite from "./images/healthBarSprite.png";

type AssetFile = { name: string; url: string };

export class Assets extends PIXI.Loader {
  private assets: AssetFile[] = [];

  constructor(game: Game) {
    super();

    this.assets = [
      { name: "enemyJson", url: "enemy.json" },
      { name: "heroJson", url: "hero.json" },
      { name: "silverKnightJson", url: "silverKnight.json" },
      { name: "birdJson", url: "bird.json" },
      { name: "heavyBanditJson", url: "heavyBandit.json" },
      { name: "skeletonJson", url: "skeleton.json" },
      { name: "qBoxSprite", url: qBoxSprite },
      { name: "background", url: background },
      { name: "aBoxSprite", url: aBoxSprite },
      { name: "aBoxSpriteDeactivated", url: aBoxSpriteDeactivated },
      { name: "checkSprite", url: checkSprite },
      { name: "crossSprite", url: crossSprite },
      { name: "healthBarSprite", url: healthBarSprite },
    ];

    this.assets.forEach((asset) => {
      // Add to loader
      this.add(asset.name, asset.url);
    });

    this.load(() => game.loadCompleted());
  }
}

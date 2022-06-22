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
import Utrecht from "./images/utrecht.png";
import ZHolland from "./images/zuid_holland.png";
import NHolland from "./images/noord_holland.png";
import Nland from "./images/nederland.png";
import GameOver from "./images/gameOver.png"
import victory from "./images/victory.png"
import startScreen from "./images/startScreen.png"

type AssetFile = { name: string; url: string };

export class Assets extends PIXI.Loader {
  private assets: AssetFile[] = [];

  constructor(game: Game) {
    super();

    this.assets = [
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
      { name: "utrecht", url: Utrecht },
      { name: "zuid-holland", url: ZHolland },
      { name: "noord-holland", url: NHolland },
      { name: "nederland", url: Nland },
      { name: "gameOver", url: GameOver },
      { name: "victory", url: victory},
      { name: "startScreen", url: startScreen}
    ];

    this.assets.forEach((asset) => {
      // Add to loader
      this.add(asset.name, asset.url);
    });

    this.load(() => game.loadCompleted());
  }
}

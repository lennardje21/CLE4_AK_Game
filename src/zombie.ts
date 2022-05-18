import * as PIXI from 'pixi.js';
import { Game } from "./game";

export class Zombie {

    zombieSprite: PIXI.Sprite
    game:Game

    constructor(game: Game){
        
         this.game = game
    
        this.zombieSprite = new PIXI.Sprite(game.loader.resources["zombieSprite"].texture)
        // this.zombieSprite.x = Math.random() * 600
        // this.zombieSprite.y = Math.random() * 600
        this.game.pixi.stage.addChild(this.zombieSprite)

    }

   

    // update(delta: number) {
    
    //     this.x += delta * 1

    // }
            
            // this.push(this.fish)
            // this.pixi.stage.addChild(this.fishes[i])
    
}
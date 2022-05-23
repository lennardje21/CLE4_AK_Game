import * as PIXI from 'pixi.js';
import { Game } from "./game";

export class Bird extends PIXI.AnimatedSprite {
    game:Game

    constructor(game: Game, textures:PIXI.Texture[]){
        console.log( 'bird gespawned')
        super(textures)
        
        this.game = game
        this.x = 100
        this.y = 300

            
            // this.birdSprite = new PIXI.Sprite(game.loader.resources["birdSprite1"].texture)
            // this.birdSprite.scale.set(0.5, 0.5)
            // this.birdSprite.y = 480
            // this.game.pixi.stage.addChild(this.birdSprite)
        this.animationSpeed = 0.1
        // this.loop = true
        // this.gotoAndPlay(4)
        this.game.pixi.stage.addChild(this)
        
        this.play()
    }

   

    update(delta: number) {
        super.update(delta)
        this.x += delta * 1

    }
            
            // this.push(this.fish)
            // this.pixi.stage.addChild(this.fishes[i])
    
}
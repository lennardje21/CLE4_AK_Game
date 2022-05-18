import * as PIXI from "pixi.js"
import {Game} from "./game"

export class Enemy extends PIXI.AnimatedSprite {

    private game: Game

    constructor(game: Game, textures) {
        console.log("I'm a zombie")
        super(textures)
        this.game = game

        this.anchor.set(0.5)
        this.x = -100
        this.y = 500
        this.animationSpeed = 0.1
        this.loop = true
        this.play()

        this.game.pixi.stage.addChild(this)
    }

    move() {
        this.x += 1
        if(this.x >= 1400) {
            this.x = -100
        }
    }
}
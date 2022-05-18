import * as PIXI from "pixi.js"
import {Game} from "./game"

export class Enemy extends PIXI.AnimatedSprite {

    private game: Game
    //geef aan hoe en snel de enemy is ook de positie waar de zombie is word hier aangegeven
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

        //voeg de enemy aan het beeld toe
        this.game.pixi.stage.addChild(this)
    }

    //laat de enemy bewegen
    move() {
        this.x += 1
        if(this.x >= 1400) {
            this.x = -100
        }
    }
}
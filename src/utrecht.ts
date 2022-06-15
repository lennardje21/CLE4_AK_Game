import * as PIXI from 'pixi.js'
import { Game } from './game'
// import { testGame } from './testGame'

export class utrecht extends PIXI.Sprite{
    constructor(texture: PIXI.Texture){
        super(texture)

        this.scale.set(1)

        this.x = 385
        this.y = 367

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)

    }
    onclick() {
        window.location.href = 'game.html'
    }
}
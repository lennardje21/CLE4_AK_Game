import * as PIXI from 'pixi.js'
import { testGame } from './testGame'

export class noordHolland extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        // this.anchor.set(0)
        this.scale.set(1)

        this.x = 330
        this.y = 52

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)

    }
    onclick() {
        // this.destroy()
        window.location.href = 'North-Holland.html'
    }
}
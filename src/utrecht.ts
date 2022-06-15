import * as PIXI from 'pixi.js'
// import { testGame } from './testGame'

export class utrecht extends PIXI.Sprite{
    constructor(texture: PIXI.Texture){
        super(texture)

        this.scale.set(1)

        this.x = 375
        this.y = 267

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)

    }
    onclick() {
        // this.destroy()
        new testGame()
    }
}
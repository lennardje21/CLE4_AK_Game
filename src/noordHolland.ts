import * as PIXI from 'pixi.js'

export class noordHolland extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.scale.set(1)
        this.x = 340
        this.y = 150
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)

    }
    onclick() {
        window.location.href = 'game.html' 
    }
}
import * as PIXI from 'pixi.js'

export class zuidHolland extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.anchor.set(0.25)
        this.x = 310
        this.y = 400
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)
    }

    onclick() {
        window.location.href = 'game.html' 
    }

}
import * as PIXI from 'pixi.js'

export class StartScreen extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)

        this.anchor.set(0.5)
        this.x = 500
        this.y = 400
        this.width = 1000
        this.height = 800
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)
    }

    onclick() {
        this.destroy() 
    }

}
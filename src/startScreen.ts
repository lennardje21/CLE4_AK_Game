import * as PIXI from 'pixi.js'

export class strt extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 200
        this.y = 125
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)
    }

    onclick() {
       this.destroy() 
    }

}
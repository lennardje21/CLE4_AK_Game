import * as PIXI from 'pixi.js'

export class nederland extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.anchor.set(0.5)
        this.x = 450
        this.y = 425

        this.alpha=0.7

    }
}
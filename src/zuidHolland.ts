import { destroyTextureCache } from '@pixi/utils'
import * as PIXI from 'pixi.js'
import { Application, CanvasResource } from 'pixi.js'
import { Game } from './game'
import { testGame } from './testGame'



export class zuidHolland extends PIXI.Sprite{
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.anchor.set(0.25)
        this.scale.set(1)
        this.x = 300
        this.y = 100

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onclick)
    }

    onclick() {
        window.location.href = 'North-Holland.html' 
    }

}

import * as PIXI from "pixi.js"
import { Texture } from "pixi.js"

export class GameOver extends PIXI.Sprite{
    constructor(gameOverTexture : Texture, x: number, y: number) {
        super(gameOverTexture)

        this.anchor.set(0.5)
        this.width = x
        this.height = y
        this.x = x/2
        this.y = y/2
        setTimeout(this.backToMap, 3000)
    }

    backToMap() {
        window.location.href = "index.html"
    }
}
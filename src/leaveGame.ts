import * as PIXI from "pixi.js"

export class LeaveGame extends PIXI.Sprite {
    constructor(texture: PIXI.Texture) {
        super(texture)

        this.anchor.set(0.5)
        this.x = 50
        this.y = 50
        this.interactive = true
        this.buttonMode = true
        this.on("pointerdown", this.buttonClicked)
    }

    buttonClicked() {
        window.location.href = "index.html"
    }
}
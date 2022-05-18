import * as PIXI from "pixi.js"
import {Game} from "./game"

type AssetFile = { name: string, url: string }


export class Assets extends PIXI.Loader{

    private assets: AssetFile[] = []
    
    constructor(game: Game) {
        super()

        this.assets = [
            {name: "zombieJson", url: "zombie.json"}
        ]

        this.assets.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
        })

        this.onProgress.add((loader) => this.showProgress(loader))

        this.load( () => game.loadCompleted() )
    }
    private showProgress(loader) {
        console.log(`Loading ${loader.progress}%`)
    }
}
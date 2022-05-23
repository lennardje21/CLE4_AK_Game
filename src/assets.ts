import * as PIXI from "pixi.js"
import {Game} from "./game"

type AssetFile = { name: string, url: string }


export class Assets extends PIXI.Loader{

    private assets: AssetFile[] = []
    
    constructor(game: Game) {
        super()

        this.assets = [
            {name: "zombieJson", url: "zombie.json"},
            {name: "knightJson", url: "knight.json"},
            {name: "silverKnightJson", url: "silverKnight.json"}
        ]

        this.assets.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
        })

        this.load( () => game.loadCompleted() )
    }

}
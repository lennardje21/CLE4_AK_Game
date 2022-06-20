import * as PIXI from "pixi.js";

//classes

import { Assets } from "./assets";
import { zuidHolland } from "./zuidHolland";
import { noordHolland } from "./noordHolland";
import { utrecht } from "./utrecht";
import { nederland } from "./nederland";
import { Game } from "./game";

export class Map {
    pixi : PIXI.Application
    loader : PIXI.Loader

    constructor(){
        this.pixi = new PIXI.Application({ width: 1000, height: 800 })
        document.body.appendChild(this.pixi.view)
        let assets = new Assets(this);
        this.loader = assets
            }
            
            loadCompleted() {
                let zuid = new zuidHolland(this.loader.resources["zuid-holland"].texture!)
                let noord = new noordHolland(this.loader.resources["noord-holland"].texture!)
                let ut = new utrecht(this.loader.resources["utrecht"].texture!)
                let nl = new nederland(this.loader.resources["nederland"].texture!)
                this.pixi.stage.addChild(nl)
                this.pixi.stage.addChild(zuid)
                this.pixi.stage.addChild(noord)
                this.pixi.stage.addChild(ut)
                
            }

    }
            
           
            
    

             


// let g = new Game()




import * as PIXI from "pixi.js";

//classes


import { Assets } from "./assets";

import { zuidHolland } from "./zuidHolland";
import { noordHolland } from "./noordHolland";
import { utrecht } from "./utrecht";
import { nederland } from "./nederland";

export class Map {
    pixi : PIXI.Application
    loader : PIXI.Loader
    // bubbles: Bubble[]=[]
    // bubble : Bubble

    constructor(){
        this.pixi = new PIXI.Application({ width: 800, height: 600 })
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
            
                
                //  this.pixi.stage.addChild(bubble)
                // fish.scale.set(1)
                // fish.y = 100
                zuid.x = 300
                zuid.y = 300


                //For loop voor meerdere bubbles. Dit maakt tot 40 bubbles.

                // for(let i = 0; i < 40; i++){
                //     let amount = new Bubble (this.loader.resources["bubbleTexture"].texture!)
                //     this.pixi.stage.addChild(amount)
                //     this.bubbles.push(amount)
                // }
                
            }

    }
            
           
            
    

             


// let g = new Game()




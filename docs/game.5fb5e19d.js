var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},i={},s=t.parcelRequirea0e5;null==s&&((s=function(t){if(t in e)return e[t].exports;if(t in i){var s=i[t];delete i[t];var h={id:t,exports:{}};return e[t]=h,s.call(h.exports,h,h.exports),h.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){i[t]=e},t.parcelRequirea0e5=s);var h=s("31xg4");h=s("31xg4"),h=s("31xg4");class r{constructor(t,e,i){this.game=t,this.questionBox=e,fetch("question.json").then((t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})).then((s=>{this.generateAnswers(s,t,e,i)})).catch(this.errorHandler)}generateAnswers(t,e,i,s){this.correctAnswer=t[i.questionId].correctA,this.answer=t[i.questionId].answers[s],this.aBoxSprite=new h.Sprite(e.loader.resources.aBoxSprite.texture),this.aBoxSprite.anchor.set(.5),this.aBoxSprite.x=i.qBoxSprite.x+180*s+208,this.aBoxSprite.y=i.qBoxSprite.y+145,this.aText=new h.Text(this.answer,{fontFamily:"Arial",fontSize:24,fill:0,align:"center"}),this.aText.anchor.set(.5),this.aText.x=this.aBoxSprite.x,this.aText.y=this.aBoxSprite.y,this.aBoxSprite.interactive=!0,this.aBoxSprite.buttonMode=!0,this.aBoxSprite.on("pointerdown",(t=>this.onButtonDown(t,i,this.answer,this.correctAnswer))),this.game.pixi.stage.addChild(this.aBoxSprite,this.aText)}onButtonDown(t,e,i,s){e.answerHandler(t,i,s)}errorHandler(t){console.log(t)}}h=s("31xg4");class a{constructor(t,e){this.game=t,this.checkSprite=new h.Sprite(t.loader.resources.checkSprite.texture),this.checkSprite.x=e.qBoxSprite.x+300,this.checkSprite.y=e.qBoxSprite.y+20,this.game.pixi.stage.addChild(this.checkSprite)}}class o{answers=[];constructor(t,e,i){this.game=t,this.hero=e,this.enemy=i,fetch("question.json").then((t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})).then((e=>{this.generateQuestion(e,t)})).catch(this.errorHandler)}generateQuestion(t,e){this.questionId=this.getRandomInt(1,4),this.question=t[this.questionId].question,this.qBoxSprite=new h.Sprite(e.loader.resources.qBoxSprite.texture),this.qBoxSprite.width=750,this.qBoxSprite.height=200,this.qBoxSprite.x=265,this.qBoxSprite.y=520,this.game.pixi.stage.addChild(this.qBoxSprite);const i=new h.TextStyle({fontFamily:"ArcadeFont",fontSize:25,fill:0,align:"center"});this.qText=new h.Text(this.question,i),this.qText.resolution=10,this.qText.anchor.set(.5),this.qText.x=this.qBoxSprite.x+375,this.qText.y=this.qBoxSprite.y+50,this.game.pixi.stage.addChild(this.qText);for(let t=0;t<3;t++){let i=new r(e,this,t);this.answers.push(i)}}async answerHandler(t,e,i){if(e===i){console.log("correct answer");new a(this.game,this);this.answers.forEach(((t,e)=>{t.aBoxSprite.texture=this.game.loader.resources.aBoxSpriteDeactivated.texture,t.aBoxSprite.interactive=!1,t.aBoxSprite.buttonMode=!1})),this.hero.attack(),await this.sleep(1500),this.qText.destroy(),this.qBoxSprite.destroy(),this.hero.health>0&&this.game.enemy.health>0&&this.game.makeQbox()}else console.log("wrong answer"),this.answers.forEach(((t,e)=>{t.aBoxSprite.texture=this.game.loader.resources.aBoxSpriteDeactivated.texture,t.aBoxSprite.interactive=!1,t.aBoxSprite.buttonMode=!1})),this.game.enemy.attack(),this.hero.takeDamage(),await this.sleep(1500),this.qText.destroy(),this.qBoxSprite.destroy(),this.hero.health>0&&this.game.enemy.health>0&&this.game.makeQbox()}sleep(t){return new Promise((e=>setTimeout(e,t)))}errorHandler(t){console.log(t)}getRandomInt(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}}h=s("31xg4");class n extends h.AnimatedSprite{constructor(t,e){super(e),this.game=t,this.x=-50,this.y=50,this.animationSpeed=.1,this.game.pixi.stage.addChild(this),this.play()}update(t){super.update(t),this.move(t)}move(t){this.x+=1*t,this.y+=Math.sin(.03*this.x),this.x>=1300&&(this.x=-50)}}var l=s("clpju");h=s("31xg4"),h=s("31xg4");class p extends h.Sprite{colorMatrix=new h.filters.ColorMatrixFilter;constructor(t){super(),this.healthBarSprite=new h.Sprite(t.loader.resources.healthBarSprite.texture),this.healthBarSprite.scale.set(2,7),t.pixi.stage.addChild(this.healthBarSprite),this.healthBarSprite.filters=[this.colorMatrix],this.colorMatrix.hue(100,!0)}updateColor(t){this.healthBarSprite.filters=[this.colorMatrix],this.colorMatrix.hue(t,!1)}}class d extends h.AnimatedSprite{frames=[];health=100;constructor(t,e,i){super(i[3]),this.speed=1,this.frames=i,this.game=t,this.hero=e,this.anchor.set(.5),this.scale.set(9,9),this.x=-100,this.y=350-50*Math.random(),this.loop=!0,this.animationSpeed=.1,this.play(),this.game.pixi.stage.addChild(this),this.healthBar=new p(t),this.healthBar.healthBarSprite.y=this.y-200}attack(){this.textures=this.frames[1],this.loop=!1,this.animationSpeed=.15,this.play(),this.onComplete=this.playIdle}update(t){this&&(super.update(t),this.move(t),this.upadateHealthBarPosition())}upadateHealthBarPosition(){this.healthBar.healthBarSprite.x=this.x-100}getHit(t){this.health-=t,this.healthBar.healthBarSprite.scale.set(.02*this.health,7),this.healthBar.updateColor(this.health),this.textures=this.frames[2],this.loop=!1,this.play(),this.onComplete=function(){this.onCollision(this.hero)?this.playIdle():(this.textures=this.frames[3],this.loop=!0,this.play())},this.health<=0&&this.die()}die(){console.log("zombie is dead"),this.textures=this.frames[4],this.loop=!1,this.play(),this.onComplete=function(){this.game.gameOver(!0),this.destroy},this.hero.idleAnimation()}move(t){this.onCollision(this.hero)?this.playIdle():this.x+=this.speed*t}playIdle(){1!=this.playing&&(this.textures=this.frames[0],this.animationSpeed=.1,this.loop=!0,this.play())}onCollision(t){let e=this.getBounds(),i=t.getBounds();return e.x+e.width>i.x&&e.x<i.x+i.width&&e.y+e.height>i.y&&e.y<i.y+i.height}}h=s("31xg4");class x extends h.Sprite{constructor(t,e,i){super(t),this.width=e,this.height=i}}h=s("31xg4");class c extends h.AnimatedSprite{frames=[];hitPoints=20;health=100;constructor(t,e){super(e[0]),this.game=t,this.frames=e,this.anchor.set(.5),this.scale.set(8,8),this.x=1e3,this.y=300,this.animationSpeed=.1,this.loop=!0,this.play(),this.interactive=!0,this.game.pixi.stage.addChild(this),this.healthBar=new p(t),this.healthBar.healthBarSprite.y=this.y-150,this.healthBar.healthBarSprite.x=this.x-100,this.idleAnimation()}attack(){this.textures=this.frames[1],this.loop=!1,this.play(),this.onFrameChange=function(t){5==t&&this.game.enemy.getHit(this.hitPoints)},this.onComplete=this.idleAnimation}takeDamage(){this.health-=25,this.healthBar.healthBarSprite.scale.set(.02*this.health,7),this.healthBar.updateColor(this.health),this.health<=0&&this.die(),this.textures=this.frames[2],this.animationSpeed=.05,this.loop=!1,this.play(),this.onComplete=this.idleAnimation}die(){console.log("hero died"),this.game.gameOver(!1)}idleAnimation(){this.textures=this.frames[0],this.animationSpeed=.1,this.loop=!0,this.play()}}h=s("31xg4"),h=s("31xg4");class u extends h.Sprite{constructor(t,e,i){super(t),this.anchor.set(.5),this.width=e,this.height=i,this.x=e/2,this.y=i/2,setTimeout(this.backToMap,3e3)}backToMap(){window.location.href="index.html"}}h=s("31xg4");class m extends h.Sprite{constructor(t,e,i){super(t),this.anchor.set(.5),this.width=e,this.height=i,this.x=e/2,this.y=i/2,setTimeout(this.backToMap,3e3)}backToMap(){window.location.href="index.html"}}h=s("31xg4");class g extends h.Sprite{constructor(t){super(t),this.anchor.set(.5),this.x=30,this.y=50,this.interactive=!0,this.buttonMode=!0,this.on("pointerdown",this.buttonClicked)}buttonClicked(){window.location.href="index.html"}}new class{questionExist=!1;screenWidth=1280;screenHeight=700;constructor(){h.settings.SCALE_MODE=h.SCALE_MODES.NEAREST,this.pixi=new h.Application({width:this.screenWidth,height:this.screenHeight,backgroundColor:2719929}),document.body.appendChild(this.pixi.view);let t=new l.Assets(this);this.loader=t}loadCompleted(){const t=new x(this.loader.resources.background.texture,this.screenWidth,this.screenHeight);this.pixi.stage.addChild(t);const e=new g(this.loader.resources.leaveGame.texture);this.pixi.stage.addChild(e);let i=this.createHeroFrames(),s=this.createEnemyFrames(),h=this.createBirdFrames();this.spawnObjects(i,h),this.spawnZombie(s),this.pixi.ticker.add((t=>this.update(t)))}spawnZombie(t){this.enemy=new d(this,this.hero,t)}spawnObjects(t,e){this.hero=new c(this,t),this.bird=new n(this,e),this.makeQbox()}createHeroFrames(){let t=[],e=[],i=[];for(let e=0;e<=3;e++)t.push(h.Texture.from(`HeavyBandit_CombatIdle_${e}.png`));for(let t=0;t<=7;t++)e.push(h.Texture.from(`HeavyBandit_Attack_${t}.png`));for(let t=0;t<=1;t++)i.push(h.Texture.from(`HeavyBandit_Hurt_${t}.png`));return[t,e,i]}createEnemyFrames(){let t=[],e=[],i=[],s=[],r=[];for(let e=1;e<=11;e++)t.push(h.Texture.from(`skeletonIdle_${e}.png`));for(let t=1;t<=18;t++)e.push(h.Texture.from(`skeletonAttack_${t}.png`));for(let t=1;t<=8;t++)i.push(h.Texture.from(`skeletonHit_${t}.png`));for(let t=1;t<=13;t++)s.push(h.Texture.from(`skeletonWalk_${t}.png`));for(let t=1;t<=15;t++)r.push(h.Texture.from(`SkeletonDie_${t}.png`));return[t,e,i,s,r]}createBirdFrames(){let t=[];for(let e=1;e<=4;e++){const i=h.Texture.from(`birdSprite${e}.png`);t.push(i)}return t}gameOver(t){if(t){let t=new m(this.loader.resources.victory.texture,this.screenWidth,this.screenHeight);this.pixi.stage.addChild(t)}else{let t=new u(this.loader.resources.gameOver.texture,this.screenWidth,this.screenHeight);this.pixi.stage.addChild(t)}}makeQbox(){let t=null;console.log(t),t=new o(this,this.hero,this.enemy)}update(t){this.enemy&&this.enemy.update(t)}};
//# sourceMappingURL=game.5fb5e19d.js.map

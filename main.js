var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

//RUN
function specterRun(game, spritesheet) {
    this.animation = new Animation(spritesheet, 61, 61, 6, 0.15, 6, true, 3);
    this.x = 0;
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 200, 100);
}

specterRun.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

specterRun.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 6 / 6) {
        this.x += this.game.clockTick * this.speed;
    }
    if (this.x > 800) this.x = -230;
}
//spriteSheet, frameWidth, frameHeight, sheetWidth,frameDuration, frames, loop, scale

// inheritance 
function specterDie(game, spritesheet) {
    this.animation = new Animation(spritesheet, 142, 60, 11, 0.20, 11, true, 3);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 300, 200);
}

specterDie.prototype = new Entity();
specterDie.prototype.constructor = specterDie;

specterDie.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

specterDie.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
//--------------------------------------------------------------
function specterScythe(game, spritesheet) {
    this.animation = new Animation(spritesheet, 94, 80, 7, 0.25, 7, true, 3);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 100, 400);
}

specterScythe.prototype = new Entity();
specterScythe.prototype.constructor = specterScythe;

specterScythe.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

specterScythe.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


function specterDance(game, spritesheet) {
    this.animation = new Animation(spritesheet, 74, 60, 4, 0.20, 4, true, 3);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 30, 200);
}

specterDance.prototype = new Entity();
specterDance.prototype.constructor = specterDie;

specterDance.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

specterDance.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function specterSwipe(game, spritesheet) {
    this.animation = new Animation(spritesheet, 85, 70, 14, 0.15, 14, true, 3);
    this.speed = 0;
    this.ctx = game.ctx;
    Entity.call(this, game, 500, 400);
}

specterSwipe.prototype = new Entity();
specterSwipe.prototype.constructor = specterSwipe;

specterSwipe.prototype.update = function () {
    // if(this.animation.elapsedTime < this.animation.totalTime * 10 / 14) {
    //     this.x += this.game.clockTick * this.speed;
    // }
    this.x += this.game.clockTick * this.speed;
    //if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

specterSwipe.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AM.queueDownload("./img/specterRun.png");
AM.queueDownload("./img/specterSwipe.png");
AM.queueDownload("./img/specterScytheAway.png");
AM.queueDownload("./img/specterDance.png");
AM.queueDownload("./img/specterDeath.png");
AM.queueDownload("./img/forest2.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/forest2.jpg")));
    gameEngine.addEntity(new specterRun(gameEngine, AM.getAsset("./img/specterRun.png")));
    gameEngine.addEntity(new specterScythe(gameEngine, AM.getAsset("./img/specterScytheAway.png")));
    gameEngine.addEntity(new specterDance(gameEngine, AM.getAsset("./img/specterDance.png")));
    gameEngine.addEntity(new specterDie(gameEngine, AM.getAsset("./img/specterDeath.png")));
    gameEngine.addEntity(new specterSwipe(gameEngine, AM.getAsset("./img/specterSwipe.png")));

    console.log("All Done!");
});
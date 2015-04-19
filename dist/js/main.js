(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameScene, gameCanvas, gameContext, gameScene, render;

GameScene = require("./scenes/game_scene");

gameCanvas = document.querySelector("#gameCanvas");

gameContext = gameCanvas.getContext("2d");

gameScene = new GameScene();

render = function() {
  gameScene.render(gameContext);
  return window.requestAnimationFrame(render);
};

gameScene.startUp();

render();



},{"./scenes/game_scene":6}],2:[function(require,module,exports){
var FireMan, Man, deadFireManImage, fireManHurtImage, fireManImage, puffImage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Man = require("./man");

fireManImage = new Image();

fireManImage.src = "images/fireman.png";

fireManHurtImage = new Image();

fireManHurtImage.src = "images/fireman_smash.png";

deadFireManImage = new Image();

deadFireManImage.src = "images/fireman_dead.png";

puffImage = new Image();

puffImage.src = "images/puff.png";

FireMan = (function(superClass) {
  extend(FireMan, superClass);

  function FireMan() {
    return FireMan.__super__.constructor.apply(this, arguments);
  }

  FireMan.prototype.health = 2;

  FireMan.prototype.image = fireManImage;

  FireMan.prototype.deadImage = deadFireManImage;

  FireMan.prototype.puffing = false;

  FireMan.prototype.puffState = 0;

  FireMan.prototype.render = function(context, xOffset, yOffset) {
    var pos;
    pos = this.getPosition(xOffset, yOffset);
    if (this.health === 1) {
      this.image = fireManHurtImage;
    }
    if (this.puffState > 0) {
      context.save();
      context.globalAlpha = this.puffState;
      context.drawImage(puffImage, pos.x - 55, pos.y + 40);
      context.restore();
    }
    if (Math.random() > 0.95 && this.health > 0) {
      this.puffing = true;
      this.puffState = 1;
    } else {
      this.puffing = false;
      this.puffState = Math.max(0, this.puffState - 0.05);
    }
    return FireMan.__super__.render.apply(this, arguments);
  };

  FireMan.prototype.update = function() {
    return FireMan.__super__.update.apply(this, arguments);
  };

  return FireMan;

})(Man);

module.exports = FireMan;



},{"./man":4}],3:[function(require,module,exports){
var Gas, HEIGHT, WIDTH, gasFistImage, gasMainImage, keyboard;

keyboard = require("../control/keyboard");

HEIGHT = 280;

WIDTH = 220;

gasMainImage = new Image();

gasMainImage.src = "images/gas_main.png";

gasFistImage = new Image();

gasFistImage.src = "images/gas_fist.png";

Gas = (function() {
  Gas.prototype.rightPunch = 0;

  Gas.prototype.leftPunch = 0;

  Gas.prototype.punchRight = true;

  Gas.prototype.punch = false;

  function Gas() {
    this.position = {
      x: 0,
      y: 0
    };
  }

  Gas.prototype.render = function(context, xOffset, yOffset) {
    var punchX, punchY, xValue, yValue;
    context.save();
    context.fillStyle = "green";
    yValue = (this.position.y + yOffset) - HEIGHT;
    xValue = this.position.x + xOffset;
    context.drawImage(gasMainImage, xValue, yValue);
    punchX = (xValue + 180) + this.leftPunch;
    punchY = (yValue + 140) - (this.leftPunch * 1.2);
    context.drawImage(gasFistImage, punchX, punchY);
    punchX = (xValue + 150) + this.rightPunch;
    punchY = (yValue + 150) - (this.rightPunch * 1.2);
    context.drawImage(gasFistImage, punchX, punchY);
    return context.restore();
  };

  Gas.prototype.update = function() {
    this.position.y += Math.sin(Date.now() / 100);
    this.position.x += Math.cos(Date.now() / 200);
    if (keyboard.isKeyPressed("W")) {
      if (this.position.y - 2 >= 0) {
        this.position.y -= 2;
      }
    } else if (keyboard.isKeyPressed("S")) {
      if (this.position.y <= 433) {
        this.position.y += 2;
      }
    }
    if (keyboard.isKeyPressed("D")) {
      this.position.x += 2;
    } else if (keyboard.isKeyPressed("A")) {
      this.position.x -= 2;
    }
    if (keyboard.isKeyPressed(" ")) {
      if (this.punchRight) {
        if (this.rightPunch < 20) {
          this.rightPunch += 4;
        }
      } else if (this.leftPunch < 20) {
        this.leftPunch += 4.5;
      }
      if (this.leftPunch >= 20 || this.rightPunch >= 20) {
        return this.punch = true;
      }
    } else {
      if (this.rightPunch > 0) {
        this.rightPunch--;
        if (this.rightPunch <= 10) {
          this.punchRight = false;
        }
      }
      if (this.leftPunch > 0) {
        this.leftPunch--;
        if (this.leftPunch <= 10) {
          return this.punchRight = true;
        }
      }
    }
  };

  return Gas;

})();

module.exports = Gas;



},{"../control/keyboard":5}],4:[function(require,module,exports){
var HEIGHT, Man, WIDTH, deadManImage, manImage;

WIDTH = 120;

HEIGHT = 220;

manImage = new Image();

manImage.src = "images/man.png";

deadManImage = new Image();

deadManImage.src = "images/man_dead.png";

Man = (function() {
  Man.prototype.health = 1;

  Man.prototype.deadImage = deadManImage;

  Man.prototype.image = manImage;

  function Man() {
    this.position = {
      x: 1000,
      y: Math.random() * 433
    };
    this.randomOffset = Math.random() * 10;
  }

  Man.prototype.render = function(context, xOffset, yOffset) {
    var pos;
    pos = this.getPosition(xOffset, yOffset);
    if (this.health !== 0) {
      return context.drawImage(this.image, pos.x, pos.y);
    } else {
      return context.drawImage(this.deadImage, pos.x, pos.y + 150);
    }
  };

  Man.prototype.getPosition = function(xOffset, yOffset) {
    return {
      x: this.position.x + xOffset,
      y: (this.position.y + yOffset) - HEIGHT
    };
  };

  Man.prototype.update = function(player) {
    var goToX, goToY, speed;
    if (this.health === 0) {
      return;
    }
    goToX = player.position.x + 200 + this.randomOffset;
    goToY = player.position.y + this.randomOffset;
    speed = 0.5 + (this.randomOffset / 5);
    if (goToX < this.position.x) {
      this.position.x -= speed;
    }
    if (goToX > this.position.x) {
      this.position.x += speed;
    }
    if (goToY < this.position.y) {
      this.position.y -= speed;
    }
    if (goToY > this.position.y) {
      return this.position.y += speed;
    }
  };

  return Man;

})();

module.exports = Man;



},{}],5:[function(require,module,exports){
var Keyboard;

Keyboard = (function() {
  Keyboard.prototype.pressedKeys = {};

  function Keyboard() {
    window.addEventListener("keydown", (function(_this) {
      return function(event) {
        return _this.pressedKeys[event.keyCode] = true;
      };
    })(this));
    window.addEventListener("keyup", (function(_this) {
      return function(event) {
        return delete _this.pressedKeys[event.keyCode];
      };
    })(this));
  }

  Keyboard.prototype.isKeyPressed = function(charOrKeyCode) {
    if (typeof charOrKeyCode === "number") {
      return this.pressedKeys[charOrKeyCode] != null;
    } else {
      return this.pressedKeys[charOrKeyCode.charCodeAt(0)] != null;
    }
  };

  return Keyboard;

})();

module.exports = new Keyboard();



},{}],6:[function(require,module,exports){
var FireMan, GROUND_HEIGHT, GameScene, Gas, Health, Man, deepBackgroundImage, groundImage, skyText;

Gas = require("../characters/gas");

Health = require("../ui/health");

Man = require("../characters/man");

FireMan = require("../characters/fireman");

GROUND_HEIGHT = 567;

groundImage = new Image();

groundImage.src = "images/ground.png";

deepBackgroundImage = new Image();

deepBackgroundImage.src = "images/deep_background.png";

skyText = ["So... this is a pretty bad game", "I was sort of going for a dark satirical thing", "but I couldn't put my heart into it.", "Realised that there's not much", "that can really stop a gas attack", "so it's just a massacre", "I hope you feel good about that.", "These people could have families..", "Oddly identical families...", "(poor asset jibe, not any sort of racism)", "this game isn't racist. It's meaningful.", "Unless you're really enjoying it", "but that's pretty unlikely.", "It's not fun on purpose! Yes! See.", "...", "...", "Not been feeling LudumDare for the last few", "think this might be my last one for a while", "There's no end to the game by the way..."];

GameScene = (function() {
  function GameScene() {}

  GameScene.prototype.xPos = 0;

  GameScene.prototype.skyTextPos = -1;

  GameScene.prototype.startTime = 0;

  GameScene.prototype.textBeats = 0;

  GameScene.prototype.killedOne = false;

  GameScene.prototype.startUp = function() {
    this.xPos = 0;
    this.player = new Gas();
    this.health = new Health();
    this.enemies = [];
    this.startTime = Date.now();
    return this.fireManRate = 0.99;
  };

  GameScene.prototype.render = function(context) {
    var enemy;
    this.drawBackground(context);
    this.drawGround(context);
    this.drawCharacters(context);
    this.drawForeGround(context);
    this.health.render(context);
    this.enemies.sort(function(a, b) {
      return a.position.y - b.position.y;
    });
    if (((function() {
      var i, len, ref, results;
      ref = this.enemies;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        enemy = ref[i];
        if (enemy.health !== 0) {
          results.push(enemy);
        }
      }
      return results;
    }).call(this)).length < 4) {
      if (Math.random() > this.fireManRate) {
        return this.enemies.push(new FireMan());
      } else {
        return this.enemies.push(new Man());
      }
    }
  };

  GameScene.prototype.drawBackground = function(context) {
    context.save();
    context.fillStyle = "rgb(123, 167, 250)";
    context.fillRect(0, 0, 1000, 1000);
    context.fillStyle = "grey";
    context.drawImage(deepBackgroundImage, 0, GROUND_HEIGHT - 200);
    context.drawImage(deepBackgroundImage, 749, GROUND_HEIGHT - 200);
    if ((Date.now() > this.startTime + 5000) && this.killedOne) {
      if (this.textBeats === 0 && skyText.length > this.skyTextPos + 1) {
        this.skyTextPos++;
        this.textBeats = skyText[this.skyTextPos].length * 10;
        if (skyText[this.skyTextPos] === "...") {
          this.textBeats = 300;
        }
      }
      this.textBeats--;
      context.save();
      context.textAlign = "center";
      context.fillStyle = "white";
      context.font = "50px Helvetica";
      context.fillText(skyText[this.skyTextPos], 500, 300);
      context.restore();
    }
    return context.restore();
  };

  GameScene.prototype.drawGround = function(context) {
    context.save();
    context.fillStyle = "#8F7107";
    context.fillRect(0, GROUND_HEIGHT, 1000, 1000 - GROUND_HEIGHT);
    context.drawImage(groundImage, 0, GROUND_HEIGHT);
    context.drawImage(groundImage, 450, GROUND_HEIGHT);
    context.drawImage(groundImage, 900, GROUND_HEIGHT);
    return context.restore();
  };

  GameScene.prototype.drawCharacters = function(context) {
    var enemy, i, len, ref;
    ref = this.enemies;
    for (i = 0, len = ref.length; i < len; i++) {
      enemy = ref[i];
      enemy.update(this.player);
      enemy.render(context, this.xPos, GROUND_HEIGHT);
      if (this.player.punch && enemy.health > 0) {
        if (Math.round(enemy.position.y / 10) === Math.round(this.player.position.y / 10)) {
          if (Math.round((enemy.position.x - 200) / 100) === Math.round(this.player.position.x / 100)) {
            if (enemy.health > 0) {
              if (this.fireManRate > 0.2) {
                this.fireManRate -= 0.05;
              }
              enemy.health--;
              if (enemy.health === 0) {
                this.killedOne = true;
              }
            }
            this.player.punch = false;
          }
        }
      }
    }
    this.player.update();
    return this.player.render(context, this.xPos, GROUND_HEIGHT);
  };

  GameScene.prototype.drawForeGround = function(context) {
    context.save();
    context.fillStyle = "pink";
    return context.restore();
  };

  return GameScene;

})();

module.exports = GameScene;



},{"../characters/fireman":2,"../characters/gas":3,"../characters/man":4,"../ui/health":7}],7:[function(require,module,exports){
var Health, LENGTH;

LENGTH = 200;

Health = (function() {
  function Health() {}

  Health.prototype.level = 100;

  Health.prototype.lives = 3;

  Health.prototype.render = function(context) {
    context.save();
    context.font = "30px Helvetica";
    context.fillStyle = context.strokeStyle = "green";
    context.fillText("Health:", 10, 33);
    context.lineWidth = 2;
    if (this.level < 15) {
      context.fillStyle = "red";
    } else if (this.level < 30) {
      context.fillStyle = "yellow";
    }
    context.fillRect(120, 10, (LENGTH / 100) * this.level, 25);
    context.strokeStyle = "black";
    context.strokeRect(120, 10, LENGTH, 25);
    return context.restore();
  };

  return Health;

})();

module.exports = Health;



},{}]},{},[1]);

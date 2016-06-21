var defaults = {
  fieldRatio : 68 / 105,
  fieldW : 600,
  fieldH : null,
  fieldColor : 'green',
  goalW: 10
};
defaults.fieldH =  defaults.fieldW * defaults.fieldRatio;
defaults.ratioPixel = defaults.fieldW / 105;
defaults.screenW = defaults.fieldW + 2 * defaults.goalW;
defaults.screenH = defaults.fieldH;

var div, canvasBkg, contextBkg, canvas, context, canvasBuffer, contextBuffer;
   
   
var players = [];
var ball;
var items = [];
var ia = [];
var lastTick;
var game = {};

function load() {
  div = document.getElementById('soccerbot');
  canvasBkg = document.createElement('canvas');
  canvasBkg.width = defaults.screenW;;
  canvasBkg.height = defaults.screenH;
  contextBkg = canvasBkg.getContext('2d');
  canvasBuffer = document.createElement('canvas');
  canvasBuffer.width = defaults.screenW;
  canvasBuffer.height = defaults.screenH;
  contextBuffer = canvasBuffer.getContext('2d');
  
  // Draw canvas
  canvas = document.createElement('canvas');
  canvas.className = 'canvasGame';
  canvas.width = defaults.screenW;;
  canvas.height = defaults.screenH;
  context = canvas.getContext('2d');
  div.appendChild(canvas);

     var player = {
       x: 100,
       y: 100,
       color: 'blue',
       radius: 7,
       ia: {},
       startPos: null,
       targetPos: null,
       speed: 100,
       step : function(delta) {
         if (this.targetPos &&
         this.startPos &&
         (this.x !== this.targetPos.x || this.y !== this.targetPos.y)) {
           var deltaX = (this.targetPos.x - this.startPos.x) / this.speed;
           var deltaY = (this.targetPos.y - this.startPos.y) / this.speed;
           
           this.x += deltaX;
           this.y += deltaY;
           
           if (this.y === this.targetPos.y) {
             this.startPos = null;
             this.targetPos = null;
           }
         }
         
         return this.ia.step(this, game);
       },
       apply : function(instruction) {
         if(instruction.action === 'moveTo') {
           this.startPos = {
             x: this.x,
             y: this.y
           };
           
           this.targetPos = {
             x: instruction.target.x,
             y: instruction.target.y
           };
         }
       },
       moveTo: function(position) {
          return {
           action: 'moveTo',
           target: position
         }
       }
     };
     
     players.push(player);
     items.push(player);
     
     var ia1 = {
       step: function(me, game) {
        return me.moveTo(game.ball);
       }
     };
     
     player.ia = ia1;
     
     ball = {
       x: defaults.screenW / 2,
       y: defaults.screenH / 2,
       color: 'white',
       radius: 5
     }
     
     items.push(ball);
     
     
    game.ball = ball;
     
    renderBackground();
    lastTick = Date.now();
    window.requestAnimationFrame(tick);
}

function renderBackground() {
  drawField(contextBkg);
}

function tick() {
  window.requestAnimationFrame(tick);
  var delta = Date.now() - lastTick;
  lastTick = Date.now();
  contextBuffer.clearRect(0, 0, defaults.screenW, defaults.screenH);
  items.forEach(function(item) {
    if (item.step) {
      var res = item.step(delta);
      if(res) {
        item.apply(res);
      }
    }
    drawItem(item, contextBuffer);
  });
  
  context.clearRect(0, 0, defaults.screenW, defaults.screenH);
  context.drawImage(canvasBkg, 0, 0);
  context.drawImage(canvasBuffer, 0, 0);
}

function drawField(cont) {
  var radiusCenter = parseInt(defaults.screenW/10);
  var goalSize = {
    h: 7.3 * defaults.ratioPixel
  };
  var seizemSize = {
    w: 16.5 * defaults.ratioPixel,
    h: 40.3 * defaults.ratioPixel
  };
  var sixmSize = {
    w: 5.5 * defaults.ratioPixel,
    h: 2 * 5.5 * defaults.ratioPixel + goalSize.h
  };
  
  
  var halfWidth = parseInt(defaults.screenW / 2);
  var halfHeight = parseInt(defaults.screenH / 2);
  
  var penaltyPoint = {
    x: defaults.goalW + 11 * defaults.ratioPixel,
    y: halfHeight
  }
  
  var halfSeizeH = halfHeight - seizemSize.h / 2;
  var halfSixH = halfHeight - sixmSize.h / 2;
  
  // Bkg
  cont.fillStyle = defaults.fieldColor ;
  cont.fillRect(0, 0, defaults.screenW, defaults.screenH);
  
  cont.strokeStyle = '#fff';
  cont.lineWidth = 2;
  
  // Cadre
  cont.beginPath();
  cont.rect(defaults.goalW,0,defaults.fieldW, defaults.fieldH);
  cont.stroke();

  // Center
  cont.beginPath();
  cont.moveTo(halfWidth, 0);
  cont.lineTo(halfWidth, defaults.fieldH);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(halfWidth, halfHeight, radiusCenter, 0, 2 * Math.PI);
  cont.stroke();
  
  // 16m
  cont.beginPath();
  cont.rect(defaults.goalW,halfSeizeH,seizemSize.w, seizemSize.h);
  cont.stroke();
  
  cont.beginPath();
  cont.rect(defaults.screenW - seizemSize.w - defaults.goalW,halfSeizeH,seizemSize.w, seizemSize.h);
  cont.stroke();
  
  // 6m
  cont.beginPath();
  cont.rect(defaults.goalW,halfSixH,sixmSize.w, sixmSize.h);
  cont.stroke();
  
  cont.beginPath();
  cont.rect(defaults.screenW - sixmSize.w - defaults.goalW,halfSixH,sixmSize.w, sixmSize.h);
  cont.stroke();
  
  // goals
  cont.beginPath();
  cont.rect(0,halfHeight - parseInt(goalSize.h / 2),defaults.goalW, goalSize.h);
  cont.stroke();
  
  cont.beginPath();
  cont.rect(defaults.screenW - defaults.goalW,halfHeight - parseInt(goalSize.h / 2),defaults.goalW, goalSize.h);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(penaltyPoint.x, penaltyPoint.y, radiusCenter, -1.05, 1.05, false);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(penaltyPoint.x, penaltyPoint.y, 1, 0, 2 * Math.PI);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(defaults.screenW - penaltyPoint.x, penaltyPoint.y, radiusCenter, Math.PI + 1.05, Math.PI - 1.05, true);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(defaults.screenW - penaltyPoint.x, penaltyPoint.y, 1, 0, 2 * Math.PI);
  cont.stroke();
}

function drawItem (item, cont){    
  var radius = item.radius || 10;
  
  cont.beginPath();
  cont.arc(item.x, item.y, radius,0, 2 * Math.PI);
  cont.lineWidth = 2;
  
  cont.fillStyle = item.color;
  cont.fill();
  
  
  // line color
  cont.strokeStyle = 'black';
  cont.stroke();
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(load);
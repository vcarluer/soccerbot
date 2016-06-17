var defaults = {
  fieldRatio : 68 / 105,
  fieldW : 600,
  fieldH : null,
  fieldColor : 'green'
};
defaults.fieldH =  defaults.fieldW * defaults.fieldRatio;
defaults.ratioPixel = defaults.fieldW / 105;

var div, canvasBkg, contextBkg, canvas, context, canvasBuffer, contextBuffer;
   
   
var players = [];
var ball;
var items = [];
var lastTick;

function load() {
  div = document.getElementById('soccerbot');
  canvasBkg = document.createElement('canvas');
  canvasBkg.className = 'canvasSimu';
  canvasBkg.width = defaults.fieldW;;
  canvasBkg.height = defaults.fieldH;
  contextBkg = canvasBkg.getContext('2d');
  div.appendChild(canvasBkg);
  canvas = document.createElement('canvas');
  canvas.className = 'canvasSimu';
  canvas.width = defaults.fieldW;;
  canvas.height = defaults.fieldH;
  context = canvas.getContext('2d');
  div.appendChild(canvas);
  canvasBuffer = document.createElement('canvas');
  canvasBuffer.width = defaults.fieldW;;
  canvasBuffer.height = defaults.fieldH;
  contextBuffer = canvasBuffer.getContext('2d');

     var player = {
       x: 100,
       y: 100,
       color: 'blue',
       step : function() {
         this.x++;
       }
     };
     
     players.push(player);
     items.push(player);
     
     ball = {
       x: defaults.fieldW / 2,
       y: defaults.fieldH / 2,
       color: 'white',
       radius: 8
     }
     
     items.push(ball);
     
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
  contextBuffer.clearRect(0, 0, defaults.fieldW, defaults.fieldH);
  items.forEach(function(item) {
    if (item.step) {
      item.step(delta); 
    }
    drawItem(item, contextBuffer);
  });
  
  context.clearRect(0, 0, defaults.fieldW, defaults.fieldH);
  context.drawImage(canvasBuffer, 0, 0);
}

function drawField(cont) {
  var radiusCenter = parseInt(defaults.fieldW/10);
  var goalSize = {
    w: 7.3 * defaults.ratioPixel,
    h: 2.4 * defaults.ratioPixel
  };
  var seizemSize = {
    w: 16.5 * defaults.ratioPixel,
    h: 40.3 * defaults.ratioPixel
  };
  
  
  var halfWidth = parseInt(defaults.fieldW / 2);
  var halfHeight = parseInt(defaults.fieldH / 2);
  
  var halfSeizeH = halfHeight - seizemSize.h / 2;
  
  cont.fillStyle = defaults.fieldColor ;
  cont.fillRect(0,0,defaults.fieldW, defaults.fieldH);
 
  cont.strokeStyle = '#fff' ;
  cont.lineWidth = 2;

  cont.beginPath();
  cont.moveTo(halfWidth, 0);
  cont.lineTo(halfWidth, defaults.fieldH);
  cont.stroke();
  
  cont.beginPath();
  cont.arc(halfWidth, halfHeight, radiusCenter, 0, 2 * Math.PI);
  cont.stroke();
  
  cont.beginPath();
  cont.rect(0,halfSeizeH,seizemSize.w, seizemSize.h);
  cont.stroke();
  
  cont.beginPath();
  cont.rect(defaults.fieldW - seizemSize.w,halfSeizeH,seizemSize.w, seizemSize.h);
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
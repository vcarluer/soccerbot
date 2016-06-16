var defaults = {
  fieldRatio : 68 / 105,
  fieldW : 600,
  fieldH : null,
  fieldColor : 'green'
};
defaults.fieldH =  defaults.fieldW * defaults.fieldRatio;
defaults.ratioPixel = defaults.fieldW / 105;

var canvas, context;
   
   
var players = [];

function load() {
    canvas = document.getElementById('soccerbot'),
    context  = canvas.getContext('2d');
  

     var player = {
       x: 100,
       y: 100,
       color: 'blue',
       step : function() {
         this.x++;
       }
     };
     
     players.push(player);
    window.requestAnimationFrame(tick);
}

function tick() {
  window.requestAnimationFrame(tick);
  context.clearRect(0, 0, defaults.fieldW, defaults.fieldH);
  drawField()
  players.forEach(function(player) {
    player.step();
    drawPlayer(player);
  });
}

function drawField() {
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
  
  canvas.width = defaults.fieldW;
  canvas.height = defaults.fieldH;
  context.fillStyle = defaults.fieldColor ;
  context.fillRect(0,0,defaults.fieldW, defaults.fieldH);
 
  context.strokeStyle = '#fff' ;
  context.lineWidth = 2;

  context.beginPath();
  context.moveTo(halfWidth, 0);
  context.lineTo(halfWidth, defaults.fieldH);
  context.stroke();
  
  context.beginPath();
  context.arc(halfWidth, halfHeight, radiusCenter, 0, 2 * Math.PI);
  context.stroke();
  
  context.beginPath();
  context.rect(0,halfSeizeH,seizemSize.w, seizemSize.h);
  context.stroke();
  
  context.beginPath();
  context.rect(defaults.fieldW - seizemSize.w,halfSeizeH,seizemSize.w, seizemSize.h);
  context.stroke();
}

function drawPlayer (player){    
  var radius = 10;
  
  context.beginPath();
  context.arc(player.x, player.y, radius,0, 2 * Math.PI);
  context.lineWidth = 2;
  
  context.fillStyle = player.color;
  context.fill();
  
  
  // line color
  context.strokeStyle = 'black';
  context.stroke();
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(load);
var fieldRatio = 68 / 105;
var fieldW = 600;
var fieldH = fieldW * fieldRatio;
var context;
var players = [];

function load() {
 var canvas =document.getElementById('soccerbot');
 canvas.width = fieldW;
 canvas.height = fieldH;
 context = canvas.getContext('2d');
     var player = {
       x: 100,
       y: 100,
       color: 'blue'
     };
     
     players.push(player);
     
      drawPlayer(player);
      window.requestAnimationFrame(tick);
}

function tick() {
  window.requestAnimationFrame(tick);
  context.clearRect(0, 0, fieldW, fieldH);
  players.forEach(function(player) {
    ia(player);
    drawPlayer(player);
  });
}

function ia(player) {
  player.x++;
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
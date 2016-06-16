function load() {
 var canvas =document.getElementById('soccerbot');
 var context = canvas.getContext('2d');
     
      drawPlayer(context, 100,100, 'blue')
      
  function drawPlayer (context, CoorX, CoorY, color){    
      var x =CoorX;
      var y = CoorY;
      var radius = 10;

      context.beginPath();
      context.arc(x, y, radius,0, 2 * Math.PI);
      context.lineWidth = 2;
      
      context.fillStyle = color;
      context.fill();
      

      // line color
      context.strokeStyle = 'black';
      context.stroke();
      
      
      
  }
      
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(load);
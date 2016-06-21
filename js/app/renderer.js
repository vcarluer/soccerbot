define(['./field'], function(field) {
   var renderer = {
       startLoop: function() {
          contextBuffer.clearRect(0, 0, field.screenW, field.screenH);
          context.clearRect(0, 0, field.screenW, field.screenH); 
       },
       
       item: function(item) {
         drawItem(item, contextBuffer);
       },
       
       render: function() {
          context.drawImage(canvasBkg, 0, 0);
          context.drawImage(canvasBuffer, 0, 0);
       }
   };
   
    var div, canvasBkg, contextBkg, canvas, context, canvasBuffer, contextBuffer;
    
    div = document.getElementById('soccerbot');
    canvasBkg = document.createElement('canvas');
    canvasBkg.width = field.screenW;;
    canvasBkg.height = field.screenH;
    contextBkg = canvasBkg.getContext('2d');
    canvasBuffer = document.createElement('canvas');
    canvasBuffer.width = field.screenW;
    canvasBuffer.height = field.screenH;
    contextBuffer = canvasBuffer.getContext('2d');
    
    // Draw canvas
    canvas = document.createElement('canvas');
    canvas.className = 'canvasGame';
    canvas.width = field.screenW;;
    canvas.height = field.screenH;
    context = canvas.getContext('2d');
    div.appendChild(canvas);
    
    renderBackground();
    
    function renderBackground() {
        drawField(contextBkg);
    }

   function drawField(cont) {
      var radiusCenter = parseInt(field.screenW/10);
      var goalSize = {
        h: 7.3 * field.ratioPixel
      };
      var seizemSize = {
        w: 16.5 * field.ratioPixel,
        h: 40.3 * field.ratioPixel
      };
      var sixmSize = {
        w: 5.5 * field.ratioPixel,
        h: 2 * 5.5 * field.ratioPixel + goalSize.h
      };
      
      
      var halfWidth = parseInt(field.screenW / 2);
      var halfHeight = parseInt(field.screenH / 2);
      
      var penaltyPoint = {
        x: field.goalW + 11 * field.ratioPixel,
        y: halfHeight
      }
      
      var halfSeizeH = halfHeight - seizemSize.h / 2;
      var halfSixH = halfHeight - sixmSize.h / 2;
      
      // Bkg
      cont.fillStyle = field.fieldColor ;
      cont.fillRect(0, 0, field.screenW, field.screenH);
      
      cont.strokeStyle = '#fff';
      cont.lineWidth = 2;
      
      // Cadre
      cont.beginPath();
      cont.rect(field.goalW,0,field.fieldW, field.fieldH);
      cont.stroke();
    
      // Center
      cont.beginPath();
      cont.moveTo(halfWidth, 0);
      cont.lineTo(halfWidth, field.fieldH);
      cont.stroke();
      
      cont.beginPath();
      cont.arc(halfWidth, halfHeight, radiusCenter, 0, 2 * Math.PI);
      cont.stroke();
      
      // 16m
      cont.beginPath();
      cont.rect(field.goalW,halfSeizeH,seizemSize.w, seizemSize.h);
      cont.stroke();
      
      cont.beginPath();
      cont.rect(field.screenW - seizemSize.w - field.goalW,halfSeizeH,seizemSize.w, seizemSize.h);
      cont.stroke();
      
      // 6m
      cont.beginPath();
      cont.rect(field.goalW,halfSixH,sixmSize.w, sixmSize.h);
      cont.stroke();
      
      cont.beginPath();
      cont.rect(field.screenW - sixmSize.w - field.goalW,halfSixH,sixmSize.w, sixmSize.h);
      cont.stroke();
      
      // goals
      cont.beginPath();
      cont.rect(0,halfHeight - parseInt(goalSize.h / 2),field.goalW, goalSize.h);
      cont.stroke();
      
      cont.beginPath();
      cont.rect(field.screenW - field.goalW,halfHeight - parseInt(goalSize.h / 2),field.goalW, goalSize.h);
      cont.stroke();
      
      cont.beginPath();
      cont.arc(penaltyPoint.x, penaltyPoint.y, radiusCenter, -1.05, 1.05, false);
      cont.stroke();
      
      cont.beginPath();
      cont.arc(penaltyPoint.x, penaltyPoint.y, 1, 0, 2 * Math.PI);
      cont.stroke();
      
      cont.beginPath();
      cont.arc(field.screenW - penaltyPoint.x, penaltyPoint.y, radiusCenter, Math.PI + 1.05, Math.PI - 1.05, true);
      cont.stroke();
      
      cont.beginPath();
      cont.arc(field.screenW - penaltyPoint.x, penaltyPoint.y, 1, 0, 2 * Math.PI);
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
   
   return renderer;
});
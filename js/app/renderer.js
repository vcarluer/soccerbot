define(function() {
   var renderer = {
       startLoop: function() {
          contextBuffer.clearRect(0, 0, defaults.screenW, defaults.screenH);
          context.clearRect(0, 0, defaults.screenW, defaults.screenH); 
       },
       
       item: function(item) {
         drawItem(item, contextBuffer);
       },
       
       render: function() {
          context.drawImage(canvasBkg, 0, 0);
          context.drawImage(canvasBuffer, 0, 0);
       }
   };
   
   var defaults = {
        fieldRatio : 68 / 105,
        fieldW : 600,
        fieldH : null,
        fieldColor : 'green',
        goalW: 10,
        worldRatio: 50
    };
    
    defaults.fieldH =  defaults.fieldW * defaults.fieldRatio;
    defaults.ratioPixel = defaults.fieldW / 105;
    defaults.screenW = defaults.fieldW + 2 * defaults.goalW;
    defaults.screenH = defaults.fieldH;
    
    var div, canvasBkg, contextBkg, canvas, context, canvasBuffer, contextBuffer;
    
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
    
    renderBackground();
    
    function renderBackground() {
        drawField(contextBkg);
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
   
   return renderer;
});
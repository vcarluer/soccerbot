define(['./renderer', './physic', './item'], function(renderer, physic, item) {
   var game = {
       start: function() {
           physic.start();
           lastTick = Date.now();
           
           for(var i = 0; i < 10; i++) {
            var color = "#FF0000";
            if (i < 5) {
                color = "#0000FF";
            }
            
            var item1 = new item(Math.random() * 100,Math.random() * 100, 10, color);
            items.push(item1);    
           }
           
           var ball = new item(Math.random() * 100,Math.random() * 100, 10, "#FFFFFF");
            items.push(ball);    
           
           window.requestAnimationFrame(tick);
       }
   };
   
   var lastTick, items = [];
   
   function tick() {    
    window.requestAnimationFrame(tick);
    var delta = Date.now() - lastTick;
    lastTick = Date.now();
    renderer.startLoop();
    
    items.forEach(function(item) {
        physic.step(delta);
        item.step(delta);
        renderer.item(item); 
    });
    
    renderer.render();
   }
   
   return game;
});
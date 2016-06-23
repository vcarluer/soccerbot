define(['./renderer', './physic', './item', './field', './ia'], function(renderer, physic, item, field, ia) {
   var game = {
       start: function() {
           physic.start();
           lastTick = Date.now();
           
           var player = new item(100, 100, 10, "#FF0000");
           player.ia = new ia();
            items.push(player);
           
           var ball = new item(field.screenW / 2,field.screenH / 2, 10, "#FFFFFF");
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
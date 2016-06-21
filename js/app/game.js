define(['./renderer', './physic', './item'], function(renderer, physic, item) {
   var game = {
       start: function(Box2D) {
           // physic.start(Box2D);
           lastTick = Date.now();
           
           /*var item1 = new item(100,100, 10, "#FF0000");
           items.push(item1);
           */
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
        // physic.step(delta);
        item.step(delta);
        renderer.item(item); 
    });
    
    renderer.render();
   }
   
   return game;
});
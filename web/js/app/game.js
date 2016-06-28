define(['./renderer', './physic', './item', './field', './ia', './api'], function(renderer, physic, item, field, ia, api) {
   var game = {
       start: function() {
           physic.start();
           lastTick = Date.now();
           
           var player = new item(100, 100, 10, "#FF0000", 1, 0.8, 0.05);
           new ia(player);
            this.items.push(player);
            
            api.items = this.items;
           
           var ball = new item(field.screenW / 2,field.screenH / 2, 10, "#FFFFFF", 1, 0.1, 0.5);
            this.items.push(ball);    
            api.ball = ball.getAlias();
           
           window.requestAnimationFrame(tick);
       },
       items: []
   };
   
   var lastTick;
   
   function tick() {    
    window.requestAnimationFrame(tick);
    var delta = Date.now() - lastTick;
    lastTick = Date.now();
    renderer.startLoop();
    api.startLoop();
    
    game.items.forEach(function(item) {
        physic.step(delta);
        item.step(delta);
        renderer.item(item); 
    });
    
    renderer.render();
   }
   
   return game;
});
define(function() {
   var physic = {
       Box2D: null,
       worldRatio: 1/50,
       ZERO: null,
       world: null,
       start: function() {
           
        this.world = new this.Box2D.b2World(new Box2D.b2Vec2(0, 10));
       },
       step: function(delta) {
           this.world.Step(delta, 2, 2);
       }
   };
   
   physic.Box2D = Box2D;
    physic.ZERO = new this.Box2D.b2Vec2(0, 0);
        
    return physic;
});
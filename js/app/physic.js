define(function() {
   var physic = {
       Box2D: null,
       worldRatio: 1/50,
       ZERO: null,
       world: null,
       start: function(B2D) {
           
    
    this.Box2D = B2D;
    this.ZERO = new this.Box2D.b2Vec2(0, 0);
        this.world = new this.Box2D.b2World(physic.ZERO);
       },
       step: function(delta) {
           
       }
   };
    return physic;
});
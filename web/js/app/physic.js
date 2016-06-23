define(['./field'], function(field) {
   var physic = {
       Box2D: null,
       worldRatio: 1/50,
       ZERO: null,
       world: null,
       start: function() {
        this.world = new this.Box2D.b2World(new Box2D.b2Vec2(0, 0));
        this.createField();
       },
       createField: function() {
           
            var bd_ground = new Box2D.b2BodyDef();
            var ground = this.world.CreateBody(bd_ground);
            
            // Bas
            var shape0 = new Box2D.b2EdgeShape();
            shape0.Set(new Box2D.b2Vec2(0, field.screenH * this.worldRatio), new Box2D.b2Vec2(field.screenW * this.worldRatio, field.screenH * this.worldRatio));
            ground.CreateFixture(shape0, 0.0)
            
            // Gauche
            var shape1 = new Box2D.b2EdgeShape();
            shape1.Set(new Box2D.b2Vec2(field.goalW * this.worldRatio, 0), new Box2D.b2Vec2(field.goalW * this.worldRatio, field.screenH * this.worldRatio));
            ground.CreateFixture(shape1, 0.0)
            
            // Haut
            var shape2 = new Box2D.b2EdgeShape();
            shape2.Set(new Box2D.b2Vec2(0, 0), new Box2D.b2Vec2(field.screenW * this.worldRatio, 0));
            ground.CreateFixture(shape2, 0.0)
            
            // Droite
            var shape3 = new Box2D.b2EdgeShape();
            shape3.Set(new Box2D.b2Vec2((field.screenW - field.goalW) * this.worldRatio, 0), new Box2D.b2Vec2((field.screenW - field.goalW) * this.worldRatio, field.screenH * this.worldRatio));
            ground.CreateFixture(shape3, 0.0)
       },
       step: function(delta) {
           this.world.Step(delta / 1000, 2, 2);
       }
   };
   
   physic.Box2D = Box2D;
    physic.ZERO = new this.Box2D.b2Vec2(0, 0);
        
    return physic;
});
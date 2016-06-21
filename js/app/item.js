define(['./physic'], function(physic) {
   function Item(x, y, radius, color) {
     this.radius = radius;
     this.color = color;
     this.x = x;
     this.y = y;
     
     var Box2D = physic.Box2D;
     
     var cshape = new Box2D.b2CircleShape();
     cshape.set_m_radius(this.radius * physic.worldRatio);
     var fixtureDef = new Box2D.b2FixtureDef();
        fixtureDef.set_density(2.5);
        fixtureDef.set_friction(0.6);
        fixtureDef.set_shape(cshape);
        fixtureDef.set_restitution(1.0);
     
     var bd = new Box2D.b2BodyDef();
     bd.set_type(Box2D.b2_dynamicBody);
     bd.set_position(new Box2D.b2Vec2(this.x * physic.worldRatio, this.y * physic.worldRatio));
     // bd.set_restitution(1);
     this.body = physic.world.CreateBody(bd);
     this.body.CreateFixture(fixtureDef);
     // this.body.SetRestitution(1),
     this.body.SetAwake(1);
     this.body.SetActive(1);
     
     this.body.ApplyLinearImpulse(new Box2D.b2Vec2(Math.random() * 10 - 5, Math.random() * 10 - 5), this.body.GetPosition(), true);

     this.step = function(delta) {
        this.x = this.body.GetPosition().get_x() / physic.worldRatio;
        this.y = this.body.GetPosition().get_y() / physic.worldRatio;
     }
   }
   
   return Item;
});
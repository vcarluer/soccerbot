define(['./physic'], function(physic) {
   function Item(x, y, radius, color) {
     this.radius = radius;
     this.color = color;
     this.x = x;
     this.y = y;
     
     var Box2D = physic.Box2D;
     
     var cshape = new Box2D.b2CircleShape();
     cshape.set_m_radius(this.radius);
     var bd = new Box2D.b2BodyDef();
     bd.set_type(Box2D.b2_dynamicBody);
     bd.set_position(new Box2D.b2Vec2(this.x, this.y));
     this.body = physic.world.CreateBody(bd);
     this.body.CreateFixture(cshape, 1.0);
     this.body.SetAwake(1);
     this.body.SetActive(1);

     this.step = function(delta) {
        this.x = this.body.GetPosition().get_x();
        this.y = this.body.GetPosition().get_y();
        
        console.log(this.x);
        console.log(this.y);
     }
   }
   
   return Item;
});
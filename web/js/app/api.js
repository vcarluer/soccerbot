define(['./physic'], function(physic) {
    var first = false;
    var vect1 = new Box2D.b2Vec2(0, 0);
    var vect2 = new Box2D.b2Vec2(0, 0);
   var api = {
       moved: {},
       startLoop: function() {
           moved = {};
       },
       moveTo: function(player, target) {
           //if (!first) {
               var playerPosition = player.body.GetPosition();
               vect1.Set(playerPosition.get_x(), playerPosition.get_y());
               vect2.Set(target.x * physic.worldRatio, target.y * physic.worldRatio);
               vect2.op_sub(vect1);
                vect2.Normalize();
                var speed = 1;
                vect2.op_mul(speed);
                // player.body.ApplyLinearImpulse(vect2,playerPosition, true);
                player.body.ApplyForce(vect2,playerPosition);
               first = true;
           //}
            
       },
       ball: null,
       items: null
   }
    
    return api;
});
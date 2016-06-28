define(['./physic'], function(physic) {
    var first = false;
    var vect1 = new Box2D.b2Vec2(0, 0);
    var vect2 = new Box2D.b2Vec2(0, 0);
    var vect3 = new Box2D.b2Vec2(0, 0);
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
                var speed = 0.3;
                vect2.op_mul(speed);
                player.body.ApplyForce(vect2,playerPosition);
               first = true;
           //}
            
       },
       tryShoot: function(player, ballId, target) {
        var playerPosition = player.body.GetPosition();
        var ball = this.items[ballId];
        var ballPosition = ball.body.GetPosition();
        vect1.Set(playerPosition.get_x(), playerPosition.get_y());
        vect2.Set(ballPosition.get_x(), ballPosition.get_y());
        vect2.op_sub(vect1);
        var length = vect2.Length();
        if (length < 0.5 && !player.hadShoot) {
         impulse(ball, target, 0.2);
         player.hadShoot = true;
        }
        
        if (length >= 0.5) {
         player.hadShoot = false;
        }
       },
       ball: null,
       items: null
   };
   
   function impulse(sourcePhy, target, powa) {
    var sourcePosition = sourcePhy.body.GetPosition();
     vect1.Set(sourcePosition.get_x(), sourcePosition.get_y());
     vect2.Set(target.x * physic.worldRatio, target.y * physic.worldRatio);
     vect2.op_sub(vect1);
      vect2.Normalize();
      var force = powa || 1;
      vect2.op_mul(force);
      sourcePhy.body.ApplyLinearImpulse(vect2, sourcePosition, true);
   }
    
    return api;
});
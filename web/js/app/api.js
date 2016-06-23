define(function() {
    var first = false;
    var vect1 = new Box2D.b2Vec2(0, 0);
    var vect2 = new Box2D.b2Vec2(0, 0);
   var api = {
       moved: {},
       startLoop: function() {
           moved = {};
       },
       moveTo: function(player, target) {
           if (!first) {
               var playerPosition = player.body.GetPosition();
               var targetPosition = target.body.GetPosition();
               vect1.Set(playerPosition.get_x(), playerPosition.get_y());
               vect2.Set(targetPosition.get_x(), targetPosition.get_y());
               vect2.op_sub(vect1);
                vect2.Normalize();
                var speed = 0.1;
                vect2.op_mul(speed);
                player.body.ApplyLinearImpulse(vect2,playerPosition, true);
               first = true;
           }
            
       },
       ball: null
   }
    
    return api;
});
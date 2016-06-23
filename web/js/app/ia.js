define(function() {
    var text = document.getElementById('iaInstructions');
    var playBut = document.getElementById('sendInstruction');
    playBut.onclick = function() {
        try {
            var instructions = new Function(text.value);      
            instructions();
        } catch(ex) {
            console.log(ex)
        }
      
      
    };
    
    function ia() {
        memory =  {};
        this.step = function(player, delta) {
            player.body.ApplyLinearImpulse(
                new Box2D.b2Vec2(Math.random() * 10 - 5, Math.random() * 10 - 5),
                player.body.GetPosition(), true);
        }
    };
    
    return ia;
})
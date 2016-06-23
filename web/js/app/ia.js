define(['./api'], function(api) {
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
    
    function ia(player) {
        this.memory =  {};
        this.player = player;
        this.player.ia = this;
        this.step = function() {
            api.moveTo(this.player, api.ball);
        }
    };
    
    return ia;
})
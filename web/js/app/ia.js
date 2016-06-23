define(['./api'], function(api) {
    var text = document.getElementById('iaInstructions');
    var playBut = document.getElementById('sendInstruction');
    playBut.onclick = function() {
        try {
            var player = api.items[0];
            var instructions = new Function('player', 'api', text.value);      
            api.items[0].ia.step = instructions;
        } catch(ex) {
            console.log(ex)
        }
      
      
    };
    
    function ia(player) {
        this.memory =  {};
        this.player = player;
        this.player.ia = this;
        
        this.step = function(player, api) {
        }
    };
    
    return ia;
})
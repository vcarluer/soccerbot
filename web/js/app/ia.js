define(['./api'], function(api) {
    var text = document.getElementById('iaInstructions');
    var playBut = document.getElementById('sendInstruction');
    playBut.onclick = function() {
        try {
            var instructions = new Function(text.value);      
            api.items[0].step = function(api) {
                instructions(api);
            }
        } catch(ex) {
            console.log(ex)
        }
      
      
    };
    
    function ia(player) {
        this.memory =  {};
        this.player = player;
        this.player.ia = this;
        
        this.step = function() {
        }
    };
    
    return ia;
})
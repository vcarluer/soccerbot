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
})
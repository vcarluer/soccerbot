define(['./game'], function(game) {
    var text = document.getElementById('iaInstructions');
    var playBut = document.getElementById('sendInstruction');
    playBut.onclick = function() {
        var currentIA = game.items[0].ia;
        currentIA.applyBehavior(text.value);
    };
})
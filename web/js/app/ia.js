define(function() {
    function ia(player) {
        this.memory =  {};
        this.player = player;
        this.player.ia = this;
        this.stepText = null;
        
        // Will be overwritten by real ia
        this.step = function(me, ball, api) {
        }
        
        this.applyBehavior = function(behaviorText) {
            try {
                var instructions = new Function('me', 'ball', 'api', behaviorText);      
                this.step = instructions;
                this.stepText = behaviorText;
            } catch(ex) {
                console.log(ex)
            }
        }
    };
    
    return ia;
})
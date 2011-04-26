// Handle keyboard key input smoothly
var KeyHandler = Class.create({
    initialize: function() {
        this.pressed = {};
        this.UP = 87;
        this.DOWN = 83;
        this.RIGHT = 68;
        this.LEFT = 65;
        this.SPACE = 32;
    },
    
    isDown: function(keyCode) {
        return this.pressed[keyCode];
    },
    
    onKeydown: function(event) {
        this.pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
        delete this.pressed[event.keyCode];
    }
});
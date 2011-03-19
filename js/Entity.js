var Entity = Class.create({
    initialize: function(coord, size, color) {
        this.position = coord;
        this.size = size;
        this.color = color;
        this.velocity = 5;
    },
    
    destroy: function() {
        
    },
    
    render: function() {
    
    },

    update: function() {
        
    },

    move: function() {
        
    },
    
    // For fun :P
    teleport: function() {
        this.position = new Coord(
            Helpers.generateRandomNumber(Game.canvasWidth),
            Helpers.generateRandomNumber(Game.canvasHeight)
        );
    }
});
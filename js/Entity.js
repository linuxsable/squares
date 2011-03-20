var Entity = Class.create({
    initialize: function(game, coord, size, color) {
        this.game = game;
        this.position = coord;
        this.size = size;
        this.color = color;
        this.velocity = 5;
    },
    
    destroy: function() {
        
    },
    
    render: function() {
        l('render super');
    },

    update: function() {
        return true;
    },

    move: function(direction) {
        switch (direction) {
            case 'up':
                this.position.y = this.position.y - this.velocity;
                break;
            case 'down':
                this.position.y = this.position.y + this.velocity;
                break;
            case 'left':
                this.position.x = this.position.x - this.velocity;
                break;
            case 'right':
                this.position.x = this.position.x + this.velocity;
                break;
        }
    },
    
    // For fun :P
    teleport: function() {
        this.position = new Coord(
            Helpers.generateRandomNumber(this.game.canvasWidth),
            Helpers.generateRandomNumber(this.game.canvasHeight)
        );
    }
});
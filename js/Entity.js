var Entity = Class.create({
    initialize: function(game, coord, size, color) {
        this.game = game;
        this.position = coord;
        this.size = size;
        this.color = color;
        this.velocity = 2;
        this.destination = null;
        this.mind = new StateMachine();
        this.id = 0;
        this.keyHandler = new KeyHandler();
    },
    
    destroy: function() {
        return;
    },
    
    render: function() {
        return;
    },

    update: function() {
        this.mind.think();
    },

    move: function(direction) {
        switch (direction) {
            case 'up':
                this.position.y -= this.velocity;
                break;
            case 'down':
                this.position.y += this.velocity;
                break;
            case 'left':
                this.position.x -= this.velocity;
                break;
            case 'right':
                this.position.x += this.velocity;
                break;
        }
        return this;
    },
    
    // For fun :P
    teleport: function() {
        this.position = Coord.getRandomInsideCanvas(this.game);
        return this;
    },
    
    randomDestination: function() {
        this.destination = Coord.getRandomInsideCanvas(this.game);
        return this;
    },
    
    incrementSize: function(sensitivity) {
        sensitivity = sensitivity || 5;
        this.size.width += sensitivity;
        this.size.height += sensitivity;
        return this;
    },
    
    decrementSize: function(sensitivity) {
        sensitivity = sensitivity || 5;
        this.size.width -= sensitivity;
        this.size.height -= sensitivity;
        return this;
    }
});
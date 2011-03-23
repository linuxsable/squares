var Entity = Class.create({
    initialize: function(game, coord, size, color) {
        this.game = game;
        this.position = coord;
        this.size = size;
        this.bounds = new Bounds(this.position, this.size);
        this.color = color;
        this.velocity = 8;
        this.destination = null;
        this.mind = new StateMachine();
        this.id = 0;
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
        this._updateBounds();
        return this;
    },
    
    // For fun :P
    teleport: function() {
        this.position = Coord.getRandomInsideBoard(this.game);
        this._updateBounds();
        return this;
    },
    
    randomDestination: function() {
        this.destination = Coord.getRandomInsideBoard(this.game);
        this._updateBounds();
        return this;
    },
    
    incrementSize: function(sensitivity) {
        sensitivity = sensitivity || 5;
        this.size.width += sensitivity;
        this.size.height += sensitivity;
        this._updateBounds();
        return this;
    },
    
    decrementSize: function(sensitivity) {
        sensitivity = sensitivity || 5;
        this.size.width -= sensitivity;
        this.size.height -= sensitivity;
        this._updateBounds();
        return this;
    },
    
    _updateBounds: function() {
        this.bounds = new Bounds(this.position, this.size);
    }
});
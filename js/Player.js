var Player = (function() {
    function Player(coord, size, color) {
        Helpers.checkCoordType(coord);
        Helpers.checkSizeType(size);
        
        this.position = coord;
        this.size = size;
        this.color = color;
        this.velocity = 10;
        
        Game.board.setOccupant(this.position, this);
    }
    
    Player.prototype.render = function(context) {
        context.fillStyle = this.color;
        context.shadowColor = '#ccc';
        context.shadowOffsetY = 2;
        context.shadowOffsetX = 2;
        context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    };
    
    Player.prototype.update = function() {

    };
    
    Player.prototype.move = function(direction) {
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
    };
    
    // For fun :P
    Player.prototype.teleport = function() {
        this.position = new Coord(
            Helpers.generateRandomNumber(Game.canvasWidth),
            Helpers.generateRandomNumber(Game.canvasHeight)
        );
    };
    
    Player.prototype.destroy = function() {
        Game.board.removeOccupant(this.position);
    };

    return Player;
})();
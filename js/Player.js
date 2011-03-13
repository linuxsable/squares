var Player = (function() {
    function Player(coord, size, color) {
        Helpers.isCoordType(coord);
        Helpers.isSizeType(size);
        
        this.position = coord;
        this.size = size;
        this.color = color;
    }
    
    Player.prototype.render = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    };
    
    Player.prototype.update = function() {
        
    };

    return Player;
})();

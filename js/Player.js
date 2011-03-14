var Player = (function() {
    function Player(coord, size, color) {
        Helpers.checkCoordType(coord);
        Helpers.checkSizeType(size);
        
        this.position = coord;
        this.size = size;
        this.color = color;
    }
    
    Player.prototype.render = function(context) {
        context.fillStyle = this.color;
        context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    };
    
    Player.prototype.update = function() {
        var colors = ['#4674ba', '#444', '#3fcd34', '#43da32'];
        var value = Date.now() % 3;
        
        this.color = colors[value];
        
        this.position = new Coord(
            Helpers.generateRandomNumber(Game.getCanvasWidth()),
            Helpers.generateRandomNumber(Game.getCanvasHeight())
        );
        
        var randomSize = Helpers.generateRandomNumber(100);
        this.size = new Size(
            randomSize,
            randomSize
        );
    };
    
    Player.prototype.move = function() {
        
    };

    return Player;
})();

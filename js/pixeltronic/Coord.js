// Basic coordinate
var Coord = Class.create({
    initialize: function(x, y) {
        this.x = x;
        this.y = y;
    }
});

Coord.getRandomInsideBoard = function(game) {
    return new Coord(
        Helpers.generateRandomNumber(game.canvasWidth),
        Helpers.generateRandomNumber(game.canvasHeight)
    );
};
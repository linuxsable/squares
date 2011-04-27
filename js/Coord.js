// Basic coordinate
var Coord = Class.extend({
    init: function(x, y) {
        this.x = x;
        this.y = y;
    }
});

Coord.getRandomInsideCanvas = function(game) {
    return new Coord(
        Helpers.generateRandomNumber(game.canvasWidth),
        Helpers.generateRandomNumber(game.canvasHeight)
    );
};
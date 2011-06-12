(function() {
  var Coord;
  Coord = (function() {
    function Coord(x, y) {
      this.x = x;
      this.y = y;
    }
    Coord.getRandomInsideCanvas = function(game) {
      return new coord(Helpers.generateRandomNumber(game.canvasWidth), Helpers.generateRandomNumber(game.canvasHeight));
    };
    return Coord;
  })();
}).call(this);

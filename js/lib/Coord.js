var Coord;
Coord = (function() {
  function Coord(x, y) {
    this.x = x;
    this.y = y;
  }
  Coord.getRandomInsideCanvas = function(game) {
    return new Coord(Helpers.generateRandomNumber(game.canvasWidth), Helpers.generateRandomNumber(game.canvasHeight));
  };
  return Coord;
})();
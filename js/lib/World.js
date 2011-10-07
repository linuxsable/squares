var World;
World = (function() {
  function World(game, size) {
    this.game = game;
    if (!(size != null)) {
      this.size = new Size(10000, 10000);
    } else {
      this.size = size;
    }
  }
  World.prototype.getRandomCoordInside = function() {
    var x, y;
    x = Helpers.generateRandomNumber(this.size.width);
    y = Helpers.generateRandomNumber(this.size.height);
    return new Coord(x, y);
  };
  World.prototype._toStr = function() {
    return 'W: ' + this.size.width + ' - H: ' + this.size.height;
  };
  return World;
})();
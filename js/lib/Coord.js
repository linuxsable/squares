var Coord;
Coord = (function() {
  function Coord(x, y) {
    this.x = x;
    this.y = y;
  }
  Coord.prototype.equalTo = function(coord) {
    if (!(coord instanceof Coord)) {
      return false;
    }
    if (coord.x !== this.x) {
      return false;
    }
    if (coord.y !== this.y) {
      return false;
    }
    return true;
  };
  return Coord;
})();
var Vector;
Vector = (function() {
  function Vector(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }
  Vector.fromPoints = function(c1, c2) {
    return new Vector(c2.x - c1.x, c2.y - c1.y);
  };
  return Vector;
})();
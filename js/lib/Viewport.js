var Viewport;
Viewport = (function() {
  function Viewport(game, coord) {
    this.game = game;
    if (!(coord != null)) {
      this.coord = new Coord(0, 0);
    } else {
      this.coord = coord;
    }
    this.lastMatrix = null;
    this.lastMatrixCoord = null;
    this.size = new Size(this.game.canvasWidth, this.game.canvasHeight);
  }
  Viewport.prototype.move = function(direction, velocity) {
    if (velocity == null) {
      velocity = 1;
    }
    switch (direction) {
      case 'up':
        this.coord.y -= velocity;
        break;
      case 'down':
        this.coord.y += velocity;
        break;
      case 'left':
        this.coord.x -= velocity;
        break;
      case 'right':
        this.coord.x += velocity;
    }
    return this;
  };
  Viewport.prototype.calcViewableCoordMatrix = function() {
    var coords, x, y;
    if (this.coord.equalTo(this.lastMatrixCoord)) {
      return this.lastMatrix;
    } else {
      this.lastMatrixCoord = this.coord;
    }
    coords = [];
    x = this.coord.x;
    while (x <= this.coord.x + this.size.width) {
      y = this.coord.y;
      while (y <= this.coord.y + this.size.height) {
        coords.push(new Coord(x, y));
        y++;
      }
      x++;
    }
    return this.lastMatrix = coords;
  };
  Viewport.prototype.getViewableCoordMatrix = function() {
    if (this.lastMatrix === null) {
      this.calcViewableCoordMatrix();
    }
    return this.lastMatrix;
  };
  return Viewport;
})();